/**
 *
 * @author Ankit Verma
 * Created at 10/04/2018
 *
 */

'use strict';
const config = require('../../config/config');
const thinky = require('thinky')(config.get('rethinkdb'));

/*
 var thinky = require('thinky')([options]);
 var r = thinky.r;
 The options argument is optional and can have the fields:
 Options for the drivers:
 min: the minimum number of connections in the pool, default 50
 max: the maximum number of connections in the pool, default 1000
 bufferSize: the minimum number of connections available in the pool, default 50
 timeoutError: number of milliseconds before reconnecting in case of an error,
 default 1000
 timeoutGb: number of milliseconds before removing a connection that has not been used,
 default 60*60*1000
 host: host of the RethinkDB server, default "localhost"
 port: client port of the RethinkDB server, default 28015
 db: the default database, default "test"
 authKey: the authentification key to the RethinkDB server, default ""
 Options for the schemas
 validate: can be "onsave" or "oncreate". The default value is "onsave"
 timeFormat: can be "native" or "raw". The default value is "native"
 r: An instance of rethinkdbdash
 */
module.exports = thinky;