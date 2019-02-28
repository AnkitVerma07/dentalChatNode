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

const OAuthClientModel = models.OAuthClients;

const RethinkOAuthClientDao = (() => {

    return {

        getOauthClientById: (id) => {
            try {
                return OAuthClientModel.get(id);
            } catch (err) {
                throw err;
            }
        },

        insertClientData: (data) => {
            try {
                return OAuthClientModel.save(data);
            } catch (err) {
                throw err;
            }
        },

        getOauthClientByClientName: async (clientId) => {
            try {
                const oauthClient = await OAuthClientModel.getAll(clientId, {index: 'clientId'});
                return oauthClient[0];
            } catch (err) {
                throw err;
            }
        },

    };
})();

module.exports = RethinkOAuthClientDao;
