const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const dataSource = process.env.TEST_DATABASE || './database.sqlite';
console.log(dataSource);
module.exports = app;
