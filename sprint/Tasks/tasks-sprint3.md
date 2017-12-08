Scrumizer
=========

A propos :
----------
Scrumizer est une application web de gestion de projet utilisant scrum.

Sprint 3 : ce sprint dure 2 semaines et commence le 04/12/2017
---------

|ID |Description|affecté|Etat|
|:-:|:----------|:---|:---|
|#T1|création de session utilisateur avec token / déconexion |no one|Done|
|#T2|Creer dans le dossier /src/templates/sprint/mysprint un fichier mysprint.html qui contient un bouton nomme builds un clique sur ce bouton entraine l'ouverture d'un modal dans lequel on affichera la liste des builds on pourra aussi ajouter /supprimer builds et qui va contenir le tableau des US du sprint,le tableau des taches du sprint et un bouton pour ajouter des US du backlog , un bouton pour creer une taches un clique sur ces boutons entraine l'ouverture d'un modal bootstrap qui respectivement permet d'ajouter des US du backlog dans le mini backlog du sprint et de creer une tache dans le sprint ndans le formulaire d'ajout de US dans le sprint nous aurons le backlog et des checkboxs sur chaque ligne ainsi que des boutons (submit,cancel),  dans le formulaire de creation d'une nouvelle tache nous aurons les champs suivants description ainsi que des boutons (submit,cancel)|no one|Done|
|#T3|Creer un fichier serviceSprint.js dans le dossier /src/templates/sprint/service.js et dans ce fichier creer les services nomme addTaskToSprint qui permet d'ajouter une tache au sprint ,un service addUsToSprintBacklog qui permet d'ajouter des US du backlog d'un projet dans un sprint , un service getTaskFromSprint qui permet de recuperer les taches d'un sprint d'un sprint, un service getUsFromSprint qui permet de recuperer les US d'un sprint,un service updateTask qui permet de modifier la description d'une tache et l'etat,un service deleteFromSprintBaacklog qui permet de   supprimer un US du mini backlog,un service nomme deleteTaskFromSprint qui permet de supprimer une taches du sprint,un service nomme assignTask qui permet a un membre d'un projet de s'assigner une tache,un service addBuild qui permet d'ajouter une nouveau build,un service qui permet de recuperer les builds associes a un sprint,un ervice qui permet de supprimer un build|no one|Done|
|#T4|Dans le repertoire /src/templates/sprint creer un fichier un fichier mySprintCtrl et dans ce fichier creer un controlleur nomme mySprintCtrl qui contient les fonctions les fonctions suivantes : addUSToSprintBacklog,addTaskToSprint,updateTaskFromSprint,deleteTaskFromSprint,deleteUsFromSprintBackog,getTaskFromSprint,getUsFromSprintBacklog,assignTask,addBuild,deleteBuildFromSprint,getAllBuildFromSprint |no one|Done|
|#T5|Creer la table Sprint_has_US qui contient 3 colonnes project_id,sprint_id,sprint_id|no one|Done|
|#T6|Dans src/server/sprint/routes.js creer une route qui permet d'ajouter un tuple dans la table Sprint_has_Us ,creer une route qui permet de supprimer un tuple dans la table Sprint_has_US , creer une route qui permet d'ajouter un tuple dans la table task , creer une route qui permet de supprimer un tuple dans la table task ,creer une route qui permet de recuperer toutes les tuples de la table Task en donnant comme parametre l'id du sprint,creer une route qui permet de recuperer les tuples de la table Sprint_has_US en donnant les parametres project_Id et sprintId,creer une route qui permet de mettre a jour un tuple dans la table Task ,creer une route qui permet de creer un tuple dans la table build , creer une route qui permet de supprimer un tuple dans la table build ,creer une route qui permet de recuperer un tuple dans la table build avec comme parametre sprint_id et project_id |no one|Done|
|#T7|Dans src/server/task/routes.js creer une route qui permet d'ajouter un tuple dans la table Sprint_has_Us, |no one|Done|
|#T8|Creer un dossier nomme team dans /src/templates/ et dans ce dossier creer un fichier team.html dans lequel on aura un formulaire permettant d'ajouter un nouveau membre a un projet dans ce forumalire on aura un champ user login et un champ role qui definit le role de l'utilisateur dans le projet  Sprint_has_US qui contient 3 colonnes project_id,sprint_id,sprint_id et un tableau qui permet d'afficher les membres du projet|no one|Done|
|#T9|Creer un fichier nomme teamService.js dans ce fichier creer un service addNewMember qui permet d'ajouter un nouveau membre a un projet , creer un service nomme revokFromProject qui permet a un utilisateur de se revoquer a un projet , creer un service nomme getMember qui permet de recuperer les membres d'un projet |no one|Done|
|#T10|Creer le fichier nommme TeamCtrl dans ce fichier creer les fonctions addMember,getMembers,revokMemberFromProject.   |no one|Done|
|#T11|Dans src/server/team/routes.js creer une route qui permet d'ajouter un tuple dans la table User_has_Project , creer une route qui permet de supprimer un tuple dans la table User_has_Project, creer une route qui permet de recuperer les tuples de la tables user_has_project avec le parametre project_id,creer  |no one|Done|
|#T12| |no one|Done|


