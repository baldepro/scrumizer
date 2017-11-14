import angular from 'angular'
import homeController from './home/home'
import projectController from './project/project'
import uiRouter from 'angular-ui-router'

angular.bootstrap(document, [appModule.name])

const app = angular.module('app', [uiRouter])

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/')

  $stateProvider
        .state('home', {
          url: '/',
          template: require('./home/home.html'),
          controller: homeController
        })
        .state('project', {
          url: '/project',
          template: require('./project/project.html'),
          controller: projectController
        })

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })
})
