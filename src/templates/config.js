import angular from 'angular'
import homeModule from './home/homeCtrl'
import homeServices from './home/homeFactory'
import projectServices from './project/projectService'
import userSession from './services/userSession'
import projectCtrl from './project/projectCtrl'
import uiRouter from 'angular-ui-router'

const app = angular.module('app', [uiRouter, homeModule.name, homeServices.name, projectCtrl.name, projectServices.name, userSession.name])

app.config(($stateProvider, $urlRouterProvider, $locationProvider, $qProvider) => {
  $qProvider.errorOnUnhandledRejections(false)
  $urlRouterProvider.otherwise('/')
  $stateProvider
        .state('home', {
          url: '/',
          template: require('./home/home.html'),
          controller: 'homeCtrl'
        })
        .state('project', {
          url: '/project/:name',
          template: require('./project/project.html'),
          controller: 'projectCtrl',
          resolve: ['$stateParams', '$location', 'loginService', function ($stateParams, $location, loginService) {
            if (!loginService.isLoggedIn() && $stateParams.name !== undefined) {
              $location.path('/')
            }
          }]
        })
        .state('us', {
          url: '/us/:project_id',
          template: require('./us/index.html'),
          controller: 'usCtrl'
        })
        .state('sprint', {
          url: '/sprint/:project_id',
          template: require('./sprint/index.html'),
          controller: 'sprintCtrl'
        })

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })
})

export default app
