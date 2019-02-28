/**
 *
 * @author Ankit Verma
 * Created at 10/04/2018
 *
 */

/**
 * Created by Ankit Verma on 3/28/17.
 */
'use strict';
const models = require("../../models/index");
const thinky = require("../../utils/thinky");
const Errors = thinky.Errors;
const GenericError = require('../../utils/errors').GenericError;
const USER_PRIVATE_FIELDS = ['hashedPassword', 'salt'];

const UserModel = models.Users;

const RethinkUserDao = (() => {

    return {

        getUserById: (userId) => {
            try {
                return UserModel.get(userId).without(USER_PRIVATE_FIELDS);
            } catch (err) {
                throw err;
            }
        },

        getFullUserById: (userId) => {
            try {
                return UserModel.get(userId);
            } catch (err) {
                throw err;
            }
        },

        postUser: async (data) => {
            try {
                const UserModel = models.Users(data);
                if (UserModel.password) {
                    UserModel.setPassword(UserModel.password);
                }
                UserModel.emails = models.Emails({id: data.email});
                return UserModel.saveAll({emails: true});
            }
            catch (err) {
                throw new GenericError(3000, err);
            }
        },

        getFullUserByEmail: async (emailAddress) => {
            try {
                const users = await UserModel.getAll(emailAddress, {index: 'email'});
                return users[0];
            } catch (err) {
                throw err;
            }
        }

    };
})();

module.exports = RethinkUserDao;
