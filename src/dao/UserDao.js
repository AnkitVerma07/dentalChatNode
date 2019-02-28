/**
 * Created by Ankit Verma on 05/10/2018.
 */

'use strict';

//const PGUserDao = require('./postgres/PGUserDao');
const RethinkUserDao = require('./rethink/RethinkUserDao');

/**
 */
const UserDao = (() => {
    // Public Methods
    return {
        getFullUserByEmail: RethinkUserDao.getFullUserByEmail,
        getFullUserById: RethinkUserDao.getFullUserById,
        postInitialUser: RethinkUserDao.postUser,
        getUserById: RethinkUserDao.getUserById
    };
})();

module.exports = UserDao;
