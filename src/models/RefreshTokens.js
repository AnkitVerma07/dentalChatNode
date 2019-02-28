/**
 *
 * @author Ankit Verma
 * Created at 10/04/2018
 *
 */
'use strict';
const crypto = require('crypto');
const thinky = require('../utils/thinky');

const r = thinky.r;
const type = thinky.type;

const RefreshTokens = thinky.createModel('refreshTokens', {
    id: type.string(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date(),
    deletedAt: type.date(),
    token: type.string(),
    dateExpired: type.date(),
    userId: type.string(),
    accessTokenId: type.string(),
    clientId: type.string()
});



// Setup Indexes
RefreshTokens.ensureIndex('token');
RefreshTokens.ensureIndex('userId');
RefreshTokens.ensureIndex('createdAt');
RefreshTokens.ensureIndex('updatedAt');
RefreshTokens.ensureIndex('deletedAt');

module.exports = RefreshTokens;

const OAuthClients = require('./OAuthClients');
const AccessTokens = require('./AccessTokens');
const Users = require('./Users');

RefreshTokens.belongsTo(OAuthClients, 'oAuthClient', 'clientId', 'id');
RefreshTokens.belongsTo(AccessTokens, 'accessToken', 'accessTokenId', 'id');
RefreshTokens.belongsTo(Users, 'user', 'userId', 'id');

