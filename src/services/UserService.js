/**
 * Created by Ankit Verma on 05/10/2018.
 */

'use strict';

const UserDao = require('../dao/UserDao');
const AccessTokenDao = require('../dao/AccessTokenDao');
const constants = require('../utils/constants');
const GenericError = require('../utils/errors').GenericError;

const UserService = (() => {
    // Public Methods
    return {

        fetchFullUserByEmail: (email) => {
            return UserDao.getFullUserByEmail(email);
        },


        removeUserAccessTokens: (userId) => {
            return AccessTokenDao.deleteTokensByUserId(userId);
        },

        changeUserPassword: (userId, password) => {
            return UserDao.updateUserPassword(userId, password);
        },

        fetchById: (id) => {
            return UserDao.getFullUserById(id);
        },

        createInitialUser: async (data) => {
            if (!data.email) {
                throw new GenericError(2001, 'No Email was provided.');
            }
            if (!data.password) {
                throw new GenericError(2002, 'No Password was set.');
            }
            const user = await UserDao.getFullUserByEmail(data.email);
            if (user) {
                throw new GenericError(2003, 'Email Already exists');
            }
            let insertData = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password
            };
            const returnUser = await UserDao.postInitialUser(insertData);
            return returnUser;
        },
    };

})();

module.exports = UserService;
