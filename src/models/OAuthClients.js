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

const OAuthClients = thinky.createModel('oAuthClients', {
    id: type.string(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date(),
    deletedAt: type.date(),
    name: type.string(),
    clientId: type.string(),
    clientSecret: type.string(),
    scope: type.string(),
    authorities: type.string(),
    tokenValiditySeconds: type.number().default(300)
});



// Setup Indexes
OAuthClients.ensureIndex('createdAt');
OAuthClients.ensureIndex('clientId');
OAuthClients.ensureIndex('updatedAt');
OAuthClients.ensureIndex('deletedAt');

module.exports = OAuthClients;


