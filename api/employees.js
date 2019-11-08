// Express basics
const express = require('express');
const employeeRouter = express.Router();

// Database connection
const sqlite = require('sqlite3');
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');
const q = require('./queries.js');

// Helper functions
const helpers = require('./helpers.js');

// Param handler
employeeRouter.param('employeeId', (req, res, next, employeeId) => {
    db.get(q.get.employee, employeeId, (err, data) => {
        if (err) next(err);
        req.employee = data;
        next();
    })
});

// Route: GET all
employeeRouter.get('/', (req, res, next) => {
    db.all(q.list.employees, (err, data) => {
        if (err) next(err);
        res.status(200).json({ employees: data });
    });    
});

// Route GET one
employeeRouter.get('/:employeeId', (req, res, next) => {
    res.status(200).json({ employee: req.employee });
});

// Route: POST
employeeRouter.post('/', (req, res, next) => {
    const employee = req.body.employee;
    if (!helpers.validate(employee, 'Employee')) {
        return res.status(400).json({ error: "Missing data."});
    } else {
        queryParams = helpers.parameterise(employee);
        db.run(q.add.employees, queryParams, (err) => {
            if (err) next(err); 
            res.status(201).json({ employee: employee});
        })
    }
});

// Route: PUT
employeeRouter.put('/:employeeId', (req, res, next) => {
    const update = req.body.employee;
    req.body.employee.id = req.employee.id;
    if (!helpers.validate(update, 'Employee')) {
        return res.status(400).json({ error: "Missing data."});
    } else {
        queryParams = helpers.parameterise(update);
        db.run(q.update.employee, queryParams, function(err) {
            if (err) next(err); 
            db.get(q.get.employee, req.employee.id, (err, data) => {
                if (err) next(err);
                res.status(201).json({ employee: data});
            })
        })
    }
});

// Export for tests
module.exports = employeeRouter;
