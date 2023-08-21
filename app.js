require('./database/mongodb/config.mongodb');
const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const routes = require('./routes/routes');
const bodyParser = require('body-parser'); // Import body-parser

app.use(cookieParser());
app.use(session({
    secret: '49968d03-f4ef-4961-a78a-1b57c3972eed',
    resave: false,
    saveUninitialized: false,
}));

app.use((req, res, next) => {
    if (req.headers['content-type'] === 'application/base64') {
        let data = '';
        req.setEncoding('base64');

        req.on('data', (chunk) => {
            data += chunk;
        });

        req.on('end', () => {
            req.body = { file: data };
            next();
        });
    } else {
        next();
    }
});
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); // Use body-parser for URL-encoded data
app.use(bodyParser.json({ limit: '10mb' })); // Use body-parser for JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use('/', routes);

module.exports = app;
