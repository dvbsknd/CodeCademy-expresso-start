// Express basics
const express = require('express');
const employeeRouter = express.Router();

// Route: GET
employeeRouter.get('/', (req, res, next) => res.status(200).send('Hello from Employee Router'));

// Export for tests
module.exports = employeeRouter;
