'use strict';

/**
 * @author Ankit Verma <ankibunkers@gmail.com>
 */

const router = require('express-promise-router')();
const OauthClientService = require('../services/OauthClientService');

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        return res.success(await OauthClientService.createOauthClient(data));
    } catch (err) {
        return res.fail(err.message);
    }
});

module.exports = router;