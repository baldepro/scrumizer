var homeRoutes    = require('./home/routes')
var projectRoutes = require('./projects/routes')

module.exports = function routes (app) {
  app.use('/', homeRoutes);
  app.use('/project', projectRoutes);
}
