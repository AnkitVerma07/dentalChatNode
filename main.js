'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const hbs = require('hbs');
const helmet = require('helmet');
const thinky = require('./src/utils/thinky.js');

const home = require('./src/routes/home');
const unsafeRouter = require('./src/routes/unsafe');
const userRouter = require('./src/routes/UsersRouter');

const authClientRouter = require('./src/routes/AuthClientRouter');

const consistentResponseMiddleware = require('./src/middleware/consistent_response');
const oauth2 = require('./src/auth/oauth2');

const app = express();

const corsOptions = {
    origin: [/localhost.*/, /cisoshare.*/, /ec2.*/, /amazonaws.*/],
    credentials: true,
};

app.use(cors(corsOptions));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(helmet());

app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use((() => {
    return (req, res, next) => {
        if (req.headers['x-amz-sns-message-type']) {
            req.headers['content-type'] = 'application/json;charset=UTF-8';
        }
        next();
    };
})());
 app.use(bodyParser.json({limit: '100mb'}));
app.use(cookieParser());

app.use('/v1.0/*', consistentResponseMiddleware().middleware);
app.use('/', home);

app.use(passport.initialize());
app.use(passport.session());
require('./src/auth/auth');


app.use('/v1.0/oauth/token', oauth2.token);
app.use('/v1.0/oauth/clients', authClientRouter);

app.use('/v1.0/dentalchatapi/unsafe', unsafeRouter);

app.use('/v1.0/dentalchatapi/users', userRouter);

// error handlers
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err =  new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res) => {
    const responseObject = {
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {},
    };

    res.status(err.status || 500)
        .json(responseObject);
});

module.exports = app;
