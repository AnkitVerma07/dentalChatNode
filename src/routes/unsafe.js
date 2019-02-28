/**
 * Created by Ankit Verma on 05/10/2018.
 */
'use strict';

/**
 * @module routers/UsersRouter
 * @author Ankit Verma
 * @requires express-promise-router
 */

/**
 * express module with promises to mount user related functions on.
 * @type {Object}
 * @const
 * @namespace UNSAFE
 */
const router = require('express-promise-router')();

/**
 * Instance of user service
 * @type {Object}
 * @const
 * @see module:services/UserService
 */
const UserService = require('../services/UserService');


/**
 * Route to register a new user in the database
 * @name post/createUser
 * @function
 * @memberof module:routers/UsersRouter~UsersRouter
 * @inner
 * @param {String} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/user', async (req, res) => {
    const data = req.body;
    try {
        let user = await UserService.createInitialUser(data);
        return res.success(user);
    }
    catch (err) {
        return res.fail(err.message);
    }
});

module.exports = router;
