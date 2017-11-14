import angular from 'angular'
import homeCtrl from './home/home-ctrl'
import homeFactory from './home/home-factory'
import projectCtrl from './project/projectCtrl'
import uiRouter from 'angular-ui-router'

const app = angular.module('app', [uiRouter, homeFactory.name])

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/')

  $stateProvider
        .state('home', {
          url: '/',
          template: require('./home/home.html'),
          controller: homeCtrl
        })
        .state('project', {
          url: '/project',
          template: require('./project/project.html'),
          controller: projectCtrl
        })

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })
})

export default app
