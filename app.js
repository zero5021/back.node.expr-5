//app.js
const app = require('./server')

app.use('/', require('./src/routes/shopRoutes'))

module.exports = app