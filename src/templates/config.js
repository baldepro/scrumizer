import angular from 'angular'
import homeCtrl from './home/home-ctrl'
import homeServices from './home/home-factory'
// import projectFactory from './project/service'
import projectCtrl from './project/projectCtrl'
import uiRouter from 'angular-ui-router'

const app = angular.module('app', [uiRouter, homeCtrl.name, homeServices.name])

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $urlRouterProvider.otherwise('/')

  $stateProvider
        .state('home', {
          url: '/',
          template: require('./home/home.html'),
          controller: 'HomeCtrl'
        })
        .state('project', {
          url: '/project/:name',
          template: require('./project/project.html'),
          controller: projectCtrl
        })

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })
})

export default app
