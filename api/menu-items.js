// Express basics
const express = require('express');
const menuItemsRouter = express.Router({mergeParams: true});

// Database connection
const sqlite = require('sqlite3');
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');
const q = require('./queries.js');

// Helper functions
const helpers = require('./helpers.js');


// Param handler
menuItemsRouter.param('menuItemId', (req, res, next, menuItemId) => {
    db.get(q.get.menuItem, menuItemId, req.params.menuId, (err, data) => {
        if (err) next(err);
        if (!data) {
            res.status(404).json({ menuItems: [] });
        } else {
            req.menuItem = data;
            next();
        }
    })
});

// Route: GET all
menuItemsRouter.get('/', (req, res, next) => {
    db.all(q.list.menuItems, req.params.menuId, (err, data) => {
        if (err) next(err);
        res.status(200).json({ menuItems: data });
    }); 
});

// Route GET one
menuItemsRouter.get('/:menuItemId', (req, res, next) => {
    res.status(200).json({ menuItem: req.menuItem });
});

// Route: POST
menuItemsRouter.post('/', (req, res, next) => {
    const menuItem = req.body.menuItem;
    menuItem.menuId = req.params.menuId;
    if (!helpers.validate(menuItem, 'MenuItem')) {
        return res.status(400).json({ error: "Missing data."});
    } else {
        queryParams = helpers.parameterise(menuItem);
        db.run(q.add.menuItem, queryParams, function(err) {
            if (err) next(err); 
            db.get(q.get.menuItem, this.lastID, req.params.menuId, (err, data) => {
                res.status(201).json({ menuItem: data });
            })
        })
    }
});

// Route: PUT
menuItemsRouter.put('/:menuItemId', (req, res, next) => {
    const update = req.body.menuItem;
    update.id = req.menuItem.id;
    if (!update.menuId) update.menuId = req.params.menuId;
    if (!helpers.validate(update, 'MenuItem')) {
        return res.status(400).json({ error: "Missing data."});
    } else {
        queryParams = helpers.parameterise(update);
        db.run(q.update.menuItem, queryParams, function(err) {
            if (err) next(err); 
            db.get(q.get.menuItem, req.menuItem.id, req.params.menuId, (err, data) => {
                if (err) next(err);
                res.status(200).json({ menuItem: data});
            })
        })
    }
});

// Route: DELETE
menuItemsRouter.delete('/:menuItemId', (req, res, next) => {
    db.run(q.delete.menuItem, req.menuItem.id, function(err) {
        if (err) next(err); 
        res.status(204).json({ message: "success"});
    })
});

// Export for tests & parent router
module.exports = menuItemsRouter;

