/**
 * Created by Ankit Verma on 05/10/2018.
 */

'use strict';

//const PGAccessTokenDao = require('./postgres/PGAccessTokenDao');
const RethinkAccessTokenDao = require('./rethink/RethinkAccessTokenDao');

const AccessTokenDao = (() => {
    return {
        getByUserId: RethinkAccessTokenDao.getByUserId,
        getByToken: RethinkAccessTokenDao.getByToken,
        saveTokenSet: RethinkAccessTokenDao.saveTokenSet,
        deleteTokensByUserId: RethinkAccessTokenDao.deleteTokensByUserId,
        deleteTokenSet: RethinkAccessTokenDao.deleteTokenSet,
    };
})();

module.exports = AccessTokenDao;
