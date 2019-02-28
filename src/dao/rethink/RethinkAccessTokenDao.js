/**
 *
 * @author Ankit Verma
 * Created at 10/04/2018
 *
 */
'use strict';
const models = require("../../models/index");
const thinky = require("../../utils/thinky");
const Errors = thinky.Errors;

const AccessTokenModel = models.AccessTokens;

const RethinkAccessTokenDao = (() => {

    return {

        getByUserId: async (userId) => {
            try {
                return AccessTokenModel
                    .getAll(userId, { index: 'userId' })
                    .nth(0)
                    .default(null)
                    .then(function(accessToken) {

                        return AccessTokenModel.get(accessToken.id).getJoin({ refreshToken: true });
                    });
            } catch (err) {
                throw err;
            }
        },

        getByToken: async (token) => {
            try {
                return AccessTokenModel
                    .getAll(token, { index: 'token' })
                    .nth(0)
                    .default(null);
            } catch (err) {
                throw err;
            }
        },

        saveTokenSet: (aTokenData, rTokenData) => {
            try {
                const refreshToken = models.RefreshTokens(rTokenData);
                const accessToken = models.AccessTokens(aTokenData);
                accessToken.refreshToken = refreshToken;
                return accessToken.saveAll({ refreshToken: true });
            } catch (err) {
                throw err;
            }
        },

        deleteTokenSet: async (accessTokenId) => {
            try {
                const accessToken = await AccessTokenModel.get(accessTokenId).getJoin({refreshToken: true});
                await AccessTokenModel.get(accessTokenId).delete().execute();
                await models.RefreshTokens.get(accessToken.refreshToken.id).delete().execute();
            } catch (err) {
                throw err;
            }
        },


        deleteTokensByUserId: async (userId) => {
            try {
                await models.RefreshTokens.getAll(userId, {index: "userId"}).delete();
                return AccessTokenModel.getAll(userId, {index: "userId"}).delete();
            } catch (err) {
                throw err;
            }
        },

    };
})();

module.exports = RethinkAccessTokenDao;
