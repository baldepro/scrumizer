import angular from 'angular'
import homeController from './templates/home/home'
import projectController from './templates/project/project'
import uiRouter from 'angular-ui-router'

const app = angular.module('app', [uiRouter])

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $urlRouterProvider.otherwise('/')

    $stateProvider
        .state('home', {
            url: '/',
            template: require('./templates/home/home.html'),
            controller: homeController
        })
        .state('project', {
            url: '/project',
            template: require('./templates/project/project.html'),
            controller: projectController
        })

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
})

export default app