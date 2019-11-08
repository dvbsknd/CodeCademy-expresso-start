// Express basics
const express = require('express');
const employeeRouter = express.Router();

// Database connection
const sqlite = require('sqlite3');
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');
const q = require('./queries.js');

// Helper functions
const helpers = require('./helpers.js');

// Route: GET
employeeRouter.get('/', (req, res, next) => {
    db.all(q.list.employees, (err, data) => {
        if (err) next(err);
        res.status(200).json({ employees: data });
    });    
});

// Route: POST
employeeRouter.post('/', (req, res, next) => {
    const employee = req.body.employee;
    if (!employee.name || !employee.position || !employee.wage) {
        return res.status(400).json({ error: "Missing data."});
    } else {
        queryParams = helpers.parameterise(employee);
        console.log(queryParams, q.add.employees);
        db.run(q.add.employees, queryParams, (err) => {
            if (err) next(err); 
            res.status(201).json({ employee: employee});
        })
    }
});

// Export for tests
module.exports = employeeRouter;
