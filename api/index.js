const app = require('./config/server');

app.listen(process.env.port || 3000);

module.exports = app;