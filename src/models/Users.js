/**
 *
 * @author Ankit Verma
 * Created at 10/04/2018
 *
 */
'use strict';
const crypto = require('crypto');
const thinky = require('../utils/thinky');

const r = thinky.r;
const type = thinky.type;

const Users = thinky.createModel('users', {
    id: type.string(),
    createdAt: type.date().default(r.now()),
    updatedAt: type.date(),
    deletedAt: type.date(),
    firstName: type.string(),
    lastName: type.string(),
    isEmailConfirmed: type.boolean().default(false),
    phone: type.string(),
    gender: type.string(),
    email: type.string().email(),
    hashedPassword: type.string(),
    avatarId: type.string(),
    password: type.virtual(),
    curPoint: type.point(),
    salt: type.string(),
    birthdate: type.date(),
    banned: type.boolean().default(false),
});


// Setup Indexes
Users.ensureIndex('email');
Users.ensureIndex('banned');
Users.ensureIndex('createdAt');
Users.ensureIndex('updatedAt');
Users.ensureIndex('deletedAt');
Users.ensureIndex('role');

Users.ensureIndex('fullName', function (doc) {
    return [doc('firstName'), doc('lastName')];
});


Users.define('encryptPassword', function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    //more secure - return crypto.pbkdf2Sync(password, this.salt, 10000, 512).toString('hex');
});


Users.define('checkPassword', function (password) {
    // Check to make sure we have the necessary fields to compare a hashed password to avoid
    // unexpected errors from the crypto library
    if (!this.salt || !this.hashedPassword) {
        return false;
    }
    return this.encryptPassword(password) === this.hashedPassword;
});


Users.define('setPassword', function (password) {
    if (!password) {
        return;
    }

    this.salt = crypto.randomBytes(128).toString('hex');
    this.hashedPassword = this.encryptPassword(password);
});


Users.define('setLocation', function (coords) {
    this.location = coords;
    this.curPoint = thinky.r.point(coords.longitude, coords.latitude);
});


module.exports = Users;
