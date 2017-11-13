var services = angular.module('services',[])

services.service('projectService', function($http){
  this.create_project = function(data){
    $http.post('/project/:user_id', data)
    .success((res) => {
      return res
    })
    .error((error) => {
      return error
    })
  }
  this.get_all_project_from_user = function(){
    $http.get('/project/:user_id')
    .success((res) => {
      return res
    })
    .error((error) => {
      return error
    })
  }
  this.get_one_project_from_user = function(){
    $http.get('/project/:user_id')
    .success((res) => {
      return res
    })
    .error((error) => {
      return error
    })
  }
  this.update_project = function(data){
    $http.put('/project/:id',data)
    .success((res) => {
      return res
    })
    .error((error) => {
      return error
    })
  }
  this.delete_project = function(){
    $http.delete('/project/:id')
    .success((res) => {
      return res
    })
    .error((error) => {
      return error
    })
  }
})
module.exports = services
