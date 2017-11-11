var homeRoutes    = require('./home/routes')
var projectRoutes = require('./projects/routes')

module.exports = function routes (app) {
  app.use('/homes', homeRoutes);
  app.use('/projects', projectRoutes);
}
