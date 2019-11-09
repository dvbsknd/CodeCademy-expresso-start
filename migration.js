// Database connection
const sqlite = require('sqlite3');
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');

// Table definitions
const tableDefs = [
    `CREATE TABLE "Employee" (
        "id" integer NOT NULL,
        "name" text NOT NULL,
        "position" text NOT NULL,
        "wage" integer NOT NULL,
        "is_current_employee" integer NOT NULL DEFAULT '1',
		PRIMARY KEY (id));`,
    `CREATE TABLE "Timesheet" (
        "id" integer NOT NULL,
        "hours" integer NOT NULL,
        "rate" integer NOT NULL,
        "date" integer NOT NULL,
        "employee_id" integer NOT NULL,
		PRIMARY KEY (id)
		FOREIGN KEY (employee_id) REFERENCES Employee (id));`,
    `CREATE TABLE "Menu" (
        "id" integer NOT NULL,
        "title" text NOT NULL,
		PRIMARY KEY (id));`,
    `CREATE TABLE "MenuItem" (
        "id" integer NOT NULL,
        "name" text NOT NULL,
        "description" text,
        "inventory" integer NOT NULL,
        "price" integer NOT NULL,
        "menu_id" integer NOT NULL,
		PRIMARY KEY (id)
		FOREIGN KEY (menu_id) REFERENCES Menu (id));`
]

// Execute SQL
tableDefs.forEach((def) => {
    db.run(def, (err) => {
        if (err) throw (err);
        console.log('Executed SQL', def);
    })
})

// Close DB connection
db.close();