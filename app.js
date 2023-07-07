require('./database/mongodb/config.mongodb');
const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const routes = require('./routes/routes');


app.use(cookieParser());
app.use(session({
    secret: '49968d03-f4ef-4961-a78a-1b57c3972eed',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use('/', routes);

module.exports = app;
