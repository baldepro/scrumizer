const homeRoutes = require('./home/routes')
const projectRoutes = require('./projects/routes')
const userStoryRoutes = require('./user-stories/routes')
const memberRoutes = require('./member/routes')
const sprintRoutes = require('./sprints/routes')
const taskRoutes = require('./tasks/routes')
const path = require('path')

module.exports = function routes (app) {
  app.use('/api/user', homeRoutes)
  app.use('/api/project', projectRoutes)
  app.use('/api/userStory', userStoryRoutes)
  app.use('/api/member', memberRoutes)
  app.use('/api/sprint', sprintRoutes)
  app.use('/api/task', taskRoutes)
  app.get('/*', (request, response) => {
    response.sendFile(path.join(process.cwd(), 'public/index.html'))
  })
}
