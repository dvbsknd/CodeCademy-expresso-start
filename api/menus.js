// Express basics
const express = require('express');
const menuRouter = express.Router();

// Database connection
const sqlite = require('sqlite3');
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');
const q = require('./queries.js');

// Helper functions
const helpers = require('./helpers.js');

// Param handler
menuRouter.param('menuId', (req, res, next, menuId) => {
    db.get(q.get.menu, menuId, (err, data) => {
        if (err) next(err);
        if (!data) {
            res.status(404).json({ error: "Not found"});
        } else {
            req.menu = data;
            next();
        }
    })
});

// Subroutes
const menuItemsRouter = require('./menu-items.js');
menuRouter.use('/:menuId/menu-items', menuItemsRouter);

// Route: GET all
menuRouter.get('/', (req, res, next) => {
    db.all(q.list.menus, (err, data) => {
        if (err) next(err);
        res.status(200).json({ menus: data });
    });    
});

// Route GET one
menuRouter.get('/:menuId', (req, res, next) => {
    res.status(200).json({ menu: req.menu });
});

// Route: POST
menuRouter.post('/', (req, res, next) => {
    const menu = req.body.menu;
    if (!helpers.validate(menu, 'Menu')) {
        return res.status(400).json({ error: "Missing data."});
    } else {
        queryParams = helpers.parameterise(menu);
        db.run(q.add.menu, queryParams, function(err) {
            if (err) next(err); 
            db.get(q.get.menu, this.lastID, (err, data) => {
                res.status(201).json({ menu: data });
            })
        })
    }
});

// Route: PUT
menuRouter.put('/:menuId', (req, res, next) => {
    const update = req.body.menu;
    req.body.menu.id = req.menu.id;
    if (!helpers.validate(update, 'Menu')) {
        return res.status(400).json({ error: "Missing data."});
    } else {
        queryParams = helpers.parameterise(update);
        db.run(q.update.menu, queryParams, function(err) {
            if (err) next(err); 
            db.get(q.get.menu, req.menu.id, (err, data) => {
                if (err) next(err);
                res.status(200).json({ menu: data});
            })
        })
    }
});

// Route: DELETE
menuRouter.delete('/:menuId', (req, res, next) => {
    db.get(q.list.menuItems, req.menu.id, (err, data) => {
        if (data) {
            res.status(400).json({ message: "Menu items exist for that menu" });
        } else {
            db.run(q.delete.menu, req.menu.id, function(err) {
                if (err) next(err); 
                res.status(204).json({ message: "Deleted" });
            })
        }
    })
});

// Export for tests
module.exports = menuRouter;
