const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite', (err) => {
    if (err) {
        return console.error(err.message);
    } else {
        console.log('Database connected.')
    }
});

db.close();
