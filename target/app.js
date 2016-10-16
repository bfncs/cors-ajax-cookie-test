'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const uid = require('uid-safe').sync;

const port = process.env.npm_package_config_port || 8200;
const sessionCookieIdentifier = 'session';
const sessionCookieDuration = 24 * 60 * 60 * 1000;
const sendFileOptions = { root : __dirname + '/public' };

const app = express();
const sessionStore = [];

app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.header('origin') || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use((req, res, next) => {
    if (req.query['p3p'] === 'true') {
    res.header('P3P', 'CP="This is not a P3P policy!')
}
    next();
});

app.get('/', (req, res) => {
    const authenticated = req.cookies[sessionCookieIdentifier] && sessionStore.includes(req.cookies[sessionCookieIdentifier]);
    if (!authenticated) {
        res.sendFile('unauthenticated.html' , sendFileOptions);
        return;
    }
    res.sendFile('authenticated.html' , sendFileOptions);
});

app.post('/login', (req, res) => {
    const sessionId = uid(24);
    sessionStore.push(sessionId);
    res.cookie(sessionCookieIdentifier, sessionId, { maxAge: sessionCookieDuration, secure: true });
    res.redirect('/');
});

app.post('/logout', (req, res) => {
    res.clearCookie(sessionCookieIdentifier);
    res.redirect('/');
});

app.listen(port, () => {
    console.log('CORS P3P target app listening on port: ' + port);
});