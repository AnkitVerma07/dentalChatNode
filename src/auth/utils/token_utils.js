/**
 * Created by Ankit Verma on 11/9/17.
 */

'use strict';


const config = require('../config');
const utils = require('./oauth_utils');
const AccessTokenService = require('../../services/AccessTokenService');

const TokenUtils = (() => {
    const sendTokenResponse = (accessToken, cb) => {
        // calculate the amount of seconds until the token expires
        const expiresInSec = Math.floor((accessToken.dateExpired.getTime() - Date.now()) / 1000);
        return cb(null, accessToken.token, accessToken.refreshToken.token, {expires_in: expiresInSec});
    };

    const genTokens = (client,user) => {
        const tokenValue = utils.uid(config.token.accessTokenLength);
        const refreshTokenValue = utils.uid(config.token.refreshTokenLength);

        // figure out the expiration date of an access token based on the client properties
        let expirationDate = null;
        if (client.tokenValiditySeconds) {
            expirationDate = config.token.calculateExpirationDate(client.tokenValiditySeconds);
        }

        // Start RethinkDB implementation
        const refreshToken = {
            token: refreshTokenValue,
            clientId: client.id,
            userId: user.id
        };

        const accessToken = {
            token: tokenValue,
            clientId: client.id,
            dateExpired: expirationDate,
            userId: user.id
        };

        return AccessTokenService.saveTokenSet(accessToken, refreshToken);
    };

    return {
        generateTokens: genTokens,

        getTokens: async (localClient, user, done) => {
            try {
                const genAccessToken = await genTokens(localClient,user);
                return sendTokenResponse(genAccessToken, done);
                //
                // // Access token exists
                // // check if the access token retrieved has expired
                // if (Date.now() < new Date(accessToken.dateExpired)) {
                //     return sendTokenResponse(accessToken, done);
                // }
                //
                // await AccessTokenService.deleteTokenSet(accessToken.id);
                // const tokenData = await genTokens(localClient, userSession);
                // return sendTokenResponse(tokenData, done);
            }
            catch (err) {
                return done(err);
            }
        },
    };
})();

module.exports = TokenUtils;
