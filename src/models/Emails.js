/**
 *
 * @author Ankit Verma
 * Created at 10/04/2018
 *
 */
'use strict';
const thinky = require('../utils/thinky');

const r = thinky.r;
const type = thinky.type;

const Emails = thinky.createModel('emails', {
    id: type.string().email().required(),
    createdAt: type.date().default(r.now()),
    claimed: type.boolean().default(false),
    userId: type.string()
});

module.exports = Emails;

const Users = require('./Users');

Emails.belongsTo(Users, 'user', 'userId', 'id');
