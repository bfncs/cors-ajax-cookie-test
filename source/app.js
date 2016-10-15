'use strict';

const express = require('express');

const app = express();
const port = process.env.npm_package_config_port || 8100;

app.use(express.static('public'));

app.listen(port, () => {
    console.log('CORS P3P source app listening on port: ' + port);
});