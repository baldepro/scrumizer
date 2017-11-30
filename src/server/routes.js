const homeRoutes = require('./home/routes')
const projectRoutes = require('./projects/routes')

module.exports = function routes (app) {
  app.use('/api/user', homeRoutes)
  app.use('/api/project', projectRoutes)
}
