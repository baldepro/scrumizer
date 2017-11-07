Scrumizer
=========

A propos :
----------

Scrumizer est une application web de gestion de projet utilisant scrum.

Sprint 1 : ce sprint dure 2 semaines et commence le 06/11/2017
---------


|ID |Description|affecté|Etat|
|:-:|:----------|:---|:---|
|#T1|Générer un projet node js appelé "scrumizer" avec le framework express js |No one|Todo|
|#T2|Créer un formulaire HTML5 appelé "createproject.html" dans le répertoire "views/" avec les labels "Project Name" et "Description" et les champs "projectname" et "description" et un bouton de type submit appelé "validate" |No one|Todo|
|#T3|Mettre en forme ce formulaire avec Bootstrap 3.0 puis créer un fichier "formstyle.css" dans le répertoire "public/stylesheets/" pour personnaliser cette mise en forme|No one|Todo|
|#T4|Dans le fichier "routes/index.js" ajouter la route "/createProject" en mode POST. *Exemple* : "*router.post('/createProject', function(req, res, next ){...});*"|No one|Todo|
|#T5|Créer un fichier appelé "controllers.js" dans le répertoire "public/javascripts" puis ajouter un controller nommé "createProjectController" pour le module création de création de projet en faisant comme suit : "*var app = angular.module('App',[]); app.controller('createProjectController', function($scope, $http){...});*"|No one|Todo|
|#T6|Créer un fichier "db/database.sql" puis créer la table "projects" avec les champs "id", "name" et "description". La clé primaire de cette table sera le champ "id" qui aura le type int autoincrement.|No one|Todo|
|#T7|Créer un fichier "db/requests.sql" puis créer une routine mysql nommée "createproject" qui prend deux paramètres "name" et "description" et qui permet d'ajouter un tuple dans la table projects. |No one|Todo|
|#T8|Créer une nouvelle routine mysql dans le fichier "db/requests.sql" nommée "updateproject" qui prend trois paramètres "id", "name" et "description" et qui modifie le tuple dont l'id est égal à la valeur du paramètre "id" dans la table projects|No one|Todo|
|#T9|Créer une nouvelle routine mysql dans le fichier "db/requests.sql" nommée "deleteproject" qui prend un paramètre "id" et qui supprime le tuple dont l'id est égal à la valeur du paramètre "id" dans la table projects|No one|Todo|
|#T10|Créer une nouvelle routine mysql dans le fichier "db/requests.sql" nommée "readproject" qui prend un paramètre "username" et qui retourne tous les tuples de la table projects dont l'id est associé au user dans la table users.|No one|Todo|
|#T11|desc|No one|Todo|
|#T12|desc|No one|Todo|
|#T13|desc|No one|Todo|
|#T14|desc|No one|Todo|
|#T15|desc|No one|Todo|