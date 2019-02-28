/**
 * Created by Ankit Verma on 05/10/2018.
 */

'use strict';

const AccessTokenDao = require('../dao/AccessTokenDao');

const AccessTokenService = (() => {
  return {
    fetchByUserId: (userId) => {
      return AccessTokenDao.getByUserId(userId);
    },

    fetchByToken: (userId) => {
      return AccessTokenDao.getByToken(userId);
    },

    saveTokenSet: (accessToken, refreshToken) => {
      return AccessTokenDao.saveTokenSet(accessToken, refreshToken);
    },

    deleteTokenSet: (accessTokenId) => {
      return AccessTokenDao.deleteTokenSet(accessTokenId);
    },
  };
})();

module.exports = AccessTokenService;
