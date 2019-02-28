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

const RefreshTokenModel = models.RefreshTokens;

const RethinkRefreshTokenDao = (() => {

    return {

        getRefreshWithAccessJoinedUserSession: async (token) => {
            try {
                const users = await RefreshTokenModel.getAll(token, {index: 'token'}).getJoin({user: true});
                return users[0];
            } catch (err) {
                throw err;
            }
        },

    };
})();

module.exports = RethinkRefreshTokenDao;
