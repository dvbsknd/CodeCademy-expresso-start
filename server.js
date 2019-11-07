// Express basics
const app = require('express')();
const PORT = process.env.PORT || 4000;

// Middleware
const midWare = [
    require('morgan')('dev'),
    require('body-parser').json(),
    require('errorhandler')(),
    require('cors')()
];
app.use(midWare);

// Routing
const apiRouter = require('./api/api.js');
app.use('/api', apiRouter);

// Start-up & export for tests
app.listen(PORT, () => console.log(`API is up at ${PORT}`));
module.exports = app;
