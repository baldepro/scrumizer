import angular from 'angular'
import homeCtrl from './templates/home/home-ctrl'
import homeFactory from './templates/home/home-factory'
import projectCtrl from './templates/project/projectCtrl'
import uiRouter from 'angular-ui-router'

const app = angular.module('app', [uiRouter, homeFactory.name])

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/')

  $stateProvider
        .state('home', {
          url: '/',
          template: require('./templates/home/home.html'),
          controller: homeCtrl
        })
        .state('project', {
          url: '/project',
          template: require('./templates/project/project.html'),
          controller: projectCtrl
        })

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })
})

export default app
