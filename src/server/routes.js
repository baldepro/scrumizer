var homeRoutes      = require('./home/routes');
var projectRoutes   = require('./projects/routes');
//var userRoutes      = require('./projects/routes')
//var userStoryRoutes = require('./projects/routes')

module.exports = function routes (app) {
  app.use('/', homeRoutes);
  app.use('/project', projectRoutes);
  //app.use('/user', userRoutes);
  //app.use('/us', userStoryRoutes);
}
