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

const AccessTokens = thinky.createModel('accessTokens', {
    id: type.string(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date(),
    deletedAt: type.date(),
    dateExpired: type.date(),
    clientId: type.string(),
    userId: type.string(),
    token: type.string()
});



// Setup Indexes
AccessTokens.ensureIndex('token');
AccessTokens.ensureIndex('userId');
AccessTokens.ensureIndex('clientId');
AccessTokens.ensureIndex('createdAt');
AccessTokens.ensureIndex('updatedAt');
AccessTokens.ensureIndex('deletedAt');

module.exports = AccessTokens;

const OAuthClients = require('./OAuthClients');
const Users = require('./Users');
const RefreshTokens = require('./RefreshTokens');

AccessTokens.hasOne(RefreshTokens, 'refreshToken', 'id', 'accessTokenId');

AccessTokens.belongsTo(Users, 'user', 'userId', 'id');
AccessTokens.belongsTo(OAuthClients, 'oAuthClient', 'clientId', 'id');

