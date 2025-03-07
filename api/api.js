// Express basics
const express = require('express');
const apiRouter = express.Router();

// Route: GET
apiRouter.get('/', (req, res, next) => res.status(200).json({ message: "Hi, from API."}));

// Routes: /employees
employeeRouter = require('./employees.js');
apiRouter.use('/employees', employeeRouter);

// Routes: /menus
menuRouter = require('./menus.js');
apiRouter.use('/menus', menuRouter);

// Export for tests
module.exports = apiRouter;
