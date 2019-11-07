const express = require('express');
const apiRouter = express.Router();
apiRouter.get('/', (req, res, next) => res.status(200).send('Hello from API'));

module.exports = apiRouter;
