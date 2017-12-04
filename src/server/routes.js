const homeRoutes = require('./home/routes')
const projectRoutes = require('./projects/routes')
const path = require('path')

module.exports = function routes (app) {
  app.use('/api/user', homeRoutes)
  app.use('/api/project', projectRoutes)
  app.get('/*', (request, response) => {
    response.sendFile(path.join(process.cwd(), 'public/index.html'))
  })
}
