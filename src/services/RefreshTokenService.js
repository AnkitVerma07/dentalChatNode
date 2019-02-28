/**
 * Created by Ankit Verma on 05/10/2018.
 */

'use strict';

const RefreshTokenDao = require('../dao/RefreshTokenDao');

const RefreshTokenService = (() => {
  return {
    fetchWithAccessJoinedUserSession: (userId) => {
      return RefreshTokenDao.getRefreshWithAccessJoinedUserSession(userId);
    },
  };
})();

module.exports = RefreshTokenService;
