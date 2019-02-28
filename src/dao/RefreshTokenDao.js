/**
 * Created by Ankit Verma on 05/10/2018.
 */

'use strict';

//const PGRefreshTokenDao = require('./postgres/PGRefreshTokenDao');
const RethinkRefreshTokenDao = require('./rethink/RethinkRefreshTokenDao');

const RefreshTokenDao = (() => {
  return {
    getRefreshWithAccessJoinedUserSession: RethinkRefreshTokenDao.getRefreshWithAccessJoinedUserSession,
  };
})();

module.exports = RefreshTokenDao;
