import angular from 'angular'
import homeModule from './home/homeCtrl'
import homeServices from './home/homeService'
import projectServices from './project/projectService'
import userSession from './services/userSession'
import usServices from './us/usService'
import sprintServices from './sprint/service'
import teamServices from './team/teamService'
import projectCtrl from './project/projectCtrl'
import usCtrl from './us/usCtrl'
import sprintCtrl from './sprint/sprintCtrl'
import teamCtrl from './team/teamCtrl'
import directives from './services/directives'
import uiRouter from 'angular-ui-router'
import jwt from 'jsonwebtoken'
import ngAnimate from 'angular-animate'

const app = angular.module('app', [uiRouter, ngAnimate,
  homeModule.name, homeServices.name,
  projectCtrl.name, projectServices.name, directives.name,
  userSession.name, usCtrl.name, usServices.name,
  sprintCtrl.name, sprintServices.name,
  teamCtrl.name, teamServices.name
])

const resolveAccess = ['$stateParams', '$location', 'loginService',
  function ($stateParams, $location, loginService) {
    if (!loginService.isLoggedIn() || $stateParams.projectId === undefined) {
      $location.path('/')
    }
  }]

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
          resolve: ['$stateParams', '$location', 'loginService', 'authToken',
            function ($stateParams, $location, loginService, authToken) {
              let decoded = jwt.decode(authToken.getToken(), {complete: true})

              if (!loginService.isLoggedIn()) {
                $location.path('/')
              } else if (decoded.payload.name !== $stateParams.name || $stateParams.name === undefined) {
                $stateParams.name = decoded.payload.name
                $location.path('/project/' + $stateParams.name)
              }
            }]
        })
        .state('us', {
          url: '/us/:projectId',
          template: require('./us/us.html'),
          controller: 'usCtrl',
          resolve: resolveAccess
        })
        .state('team', {
          url: '/team/:projectId',
          template: require('./team/team.html'),
          controller: 'teamCtrl',
          resolve: resolveAccess
        })
        .state('sprint', {
          url: '/sprint/:projectId',
          template: require('./sprint/index.html'),
          controller: 'sprintCtrl'
        })

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })
})

export default app
