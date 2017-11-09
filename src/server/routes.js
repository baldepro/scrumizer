var homeRoutes = require('./home/routes')

module.exports = function routes (app) {
  app.use('/homes', homeRoutes)
}
