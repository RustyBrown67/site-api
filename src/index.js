import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
//import mongoose-relationship from 'mongoose-relationship';
import passport from 'passport';
//const relationship = require('mongoose-relationship').Strategy;
const LocalStrategy = require('passport-local').Strategy;
// Could have also used;
// import { Strategy as LocalStrategy } from 'passport-local';

import config from './config';
import routes from './routes';

let app = express();
app.server = http.createServer(app);

//middleware
// parser application/json
app.use(bodyParser.json({
  limit: config.bodyLimit
}));

//passport config
app.use(passport.initialize());
let Account = require('./model/account');
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  Account.authenticate()
));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//api routes v1
app.use('/v1', routes);

app.server.listen(config.port);
console.log(app.server.address().port);

export default app;
