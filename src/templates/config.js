import angular from 'angular'
import homeModule from './home/home-ctrl'
import homeServices from './home/home-factory'
import projectServices from './project/service'
import usServices from './us/serviceUs'
import projectCtrl from './project/projectCtrl'
import usCtrl from './us/usCtrl'
import uiRouter from 'angular-ui-router'

const app = angular.module('app', [uiRouter, homeModule.name, homeServices.name, projectCtrl.name, projectServices.name, usCtrl.name, usServices.name])

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
          controller: 'projectCtrl'
        })
        .state('us', {
          url: '/us/:project_id',
          template: require('./us/index.html'),
          controller: 'usCtrl'
        })

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })
})

export default app
