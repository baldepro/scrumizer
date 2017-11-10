Scrumizer
=========

A propos :
----------
Scrumizer est une application web de gestion de projet utilisant scrum.

Sprint 1 : ce sprint dure 2 semaines et commence le 06/11/2017
---------

|ID |Description|affecté|Etat|
|:-:|:----------|:---|:---|
|#T1|Générer un projet node js appelé "scrumizer" avec le framework express js |baldepro|Done|
|#T2|Créer un formulaire HTML5 dans un fichier nommé "create_project.html" dans le répertoire "src/templates/project/" avec les labels "Nom projet" et "Description" et les champs "projectname" et "description" et un bouton de type submit appelé "Creer projet" |Cheikh|Todo|
|#T3|Créer un formulaire HTML5 dans un fichier nommé "create_account.html" dans le répertoire "src/templates/account" avec les labels "Nom", "Email" et les champs "name" et "mail" et un bouton de type submit appelé "Creer compte" |Cheikh|Todo|
|#T4|Créer un formulaire HTML5 dans un fichier nommé "create_user_story.html" dans le répertoire "src/templates/user_story/" avec les labels "Description", "Priorite", "Cout" et "Etat" et les champs "description", "priority", "cost" et "state" et un bouton de type submit appelé "Creer user story" |Cheikh|Todo|
|#T4|Créer un fichier nommé "list_project.html" dans le répertoire "src/templates/project/" qui affiche la liste des projets auquels un utilisateur contribue dans un tableau et qui propose des inputs de  type radio et un bouton supprimer pour supprimer un projet |Cheikh|Todo|
|#T5|Mettre du style à ces formulaires avec Bootstrap 3.0 puis créer un fichier "style.css" dans le répertoire "src/css" pour personnaliser cette mise en forme|Ataline|Todo|
|#T6|Dans le fichier "src/server/route.js" ajouter les route "/project", "/user" et "/userStory" en mode POST. *Exemple* : "*router.post('/createProject', function(req, res, next ){...});*"|baldepro|Todo|
|#T7|Créer les fichiers createProject.js, createAccount.js, createUS.js et listProjectController.js et  ajouter les controlleurs nommés respectivement "createProjectController", "createUserController" et "createUSController" pour les modules création de création de projet, de user et de user_story en faisant comme suit : "*var app = angular.module('App',[]); app.controller('createProjectController', function($scope, $http){...});*"|baldepro|Todo|
|#T8|Créer un fichier "db/database.sql" puis créer les tables de la base de données.|Sebastien|Todo|
|#T9|Créer un fichier "src/server/db/requests.sql" puis créer une routine mysql nommée "create_project" qui prend deux paramètres "name" et "description" et qui permet d'ajouter un tuple dans la table project.|Sebastien|Todo|
|#T10|Créer un fichier "src/server/db/requests.sql" puis créer une routine mysql nommée "create_user" qui prend trois paramètres "name", "mail", "role"  et "password" et qui permet d'ajouter un tuple dans la table user.|Cheikh|Todo|
|#T11|Créer un fichier "src/server/db/requests.sql" puis créer une routine mysql nommée "create\_user\_story" qui prend quatre paramètres "description", "priority", "cost" et "state" et qui permet d'ajouter un tuple dans la table user_story. |Sebastien|Todo|
|#T12|Creer un fichier configuration .travis.yaml à la racine du projet.|Talibe|Todo|
|#T13|Créer le fichier test_us.js pour rédiger les tests de validation (le scénario) des users stories.|Ataline|Todo|
|#T14|Configuration du fichier server.js.|Ataline|Todo|
