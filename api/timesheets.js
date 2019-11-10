// Express basics
const express = require('express');
const timesheetsRouter = express.Router({mergeParams: true});

// Database connection
const sqlite = require('sqlite3');
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');
const q = require('./queries.js');

// Helper functions
const helpers = require('./helpers.js');


// Param handler
timesheetsRouter.param('timesheetId', (req, res, next, timesheetId) => {
    db.get(q.get.timesheet, timesheetId, req.params.employeeId, (err, data) => {
        if (err) next(err);
        if (!data) {
            res.status(404).json({ timesheets: [] });
        } else {
            req.timesheet = data;
            next();
        }
    })
});

// Route: GET all
timesheetsRouter.get('/', (req, res, next) => {
    db.all(q.list.timesheets, req.params.employeeId, (err, data) => {
        if (err) next(err);
        res.status(200).json({ timesheets: data });
    }); 
});

// Route GET one
timesheetsRouter.get('/:timesheetId', (req, res, next) => {
    res.status(200).json({ timesheet: req.timesheet });
});

// Route: POST
timesheetsRouter.post('/', (req, res, next) => {
    const timesheet = req.body.timesheet;
    timesheet.employeeId = req.params.employeeId;
    if (!helpers.validate(timesheet, 'Timesheet')) {
        return res.status(400).json({ error: "Missing data."});
    } else {
        queryParams = helpers.parameterise(timesheet);
        db.run(q.add.timesheet, queryParams, function(err) {
            if (err) next(err); 
            db.get(q.get.timesheet, this.lastID, req.params.employeeId, (err, data) => {
                res.status(201).json({ timesheet: data });
            })
        })
    }
});

// Route: PUT
timesheetsRouter.put('/:timesheetId', (req, res, next) => {
    const update = req.body.timesheet;
    update.id = req.timesheet.id;
    if (!update.employeeId) update.employeeId = req.params.employeeId;
    if (!helpers.validate(update, 'Timesheet')) {
        return res.status(400).json({ error: "Missing data."});
    } else {
        queryParams = helpers.parameterise(update);
        db.run(q.update.timesheet, queryParams, function(err) {
            if (err) next(err); 
            db.get(q.get.timesheet, req.timesheet.id, req.params.employeeId, (err, data) => {
                if (err) next(err);
                res.status(200).json({ timesheet: data});
                console.log(req.timesheet.id);
            })
        })
    }
});

// Route: DELETE
timesheetsRouter.delete('/:timesheetId', (req, res, next) => {
    db.run(q.delete.timesheet, req.timesheet.id, function(err) {
        if (err) next(err); 
        res.status(204).json({ message: "success"});
    })
});

// Export for tests & parent router
module.exports = timesheetsRouter;
