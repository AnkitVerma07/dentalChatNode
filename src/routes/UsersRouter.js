/**
 * Created by Ankit Verma on 05/10/2018.
 */
'use strict';

/**
 * @module routers/UsersRouter
 * @author Ankit Verma
 * @requires express-promise-router
 * @requires services/UserService
 */

/**
 * express module with promises to mount user related functions on.
 * @type {Object}
 * @const
 * @namespace UsersRouter
 */
const router = require('express-promise-router')();
const passport = require('passport');
const config = require('../../config/config');
const authAccessToken = require('../utils/auth_tool').authAccessToken;
const GenericError = require('../utils/errors').GenericError;

/**
 * Instance of user service
 * @type {Object}
 * @const
 * @see module:services/UserService
 */
const UserService = require('../services/UserService');

/**
 * Route to grab users.
 * @name post/
 * @function
 * @memberof module:routers/UsersRouter~UsersRouter
 * @inner
 * @param {String} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/me', authAccessToken, async (req, res) => {
    if (!req.user) {
        throw new GenericError(1000, 'No User found.');
    }
    try {
        const user = req.user;
        return res.success(user);
    }
    catch (err) {
        return res.fail(err.message);
    }
});

module.exports = router;
