/**
 * Created by Ankit Verma on 05/10/2018.
 */

'use strict';

//const PGOauthClientDao = require('./postgres/PGOauthClientDao');
const RethinkOAuthClientDao = require('./rethink/RethinkOAuthClientDao');

const OauthClientDao = (() => {
  return {
    getOauthClientById: RethinkOAuthClientDao.getOauthClientById,
    getOauthClientByClientName: RethinkOAuthClientDao.getOauthClientByClientName,
    insertClientData: RethinkOAuthClientDao.insertClientData,
  };
})();

module.exports = OauthClientDao;
