-------------------------------------------------------------------------------------------------------
------------------------------------- CRUD user -------------------------------------------------------
-------------------------------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS create_user(VARCHAR(20), role);
CREATE FUNCTION create_user(name VARCHAR(20), role role = 'developer') 
RETURNS INT AS $$
DECLARE result INT DEFAULT 0;
BEGIN
	INSERT INTO "user" (name) 
	VALUES (name) RETURNING id INTO result;
    RETURN result;
END$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS edit_user(INT, VARCHAR(20));
CREATE FUNCTION edit_user(user_id INT, name VARCHAR(20)) 
RETURNS VOID AS $$
BEGIN
	UPDATE "user" SET name = name WHERE id = user_id;
END$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS delete_user(INT);
CREATE FUNCTION delete_user(user_id INT) 
RETURNS VOID AS $$
BEGIN
	DELETE FROM "user" WHERE id = user_id;
END$$ LANGUAGE plpgsql;

-------------------------------------------------------------------------------------------------------
------------------------------------- CRUD project ----------------------------------------------------
-------------------------------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS get_projects_from_user(INT);
CREATE FUNCTION get_projects_from_user(user_id INT) 
RETURNS TABLE(name VARCHAR(20), git_url VARCHAR(255), description VARCHAR(2000), role role) AS $$
#variable_conflict use_variable
BEGIN
	RETURN QUERY 
	SELECT p.name, p.git_url, p.description, uhp.user_role 
	FROM project AS p
	INNER JOIN user_has_project uhp ON (p.id = uhp.project_id)
	WHERE uhp.user_id = user_id;
END $$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS get_project_from_user(INT, INT);
CREATE FUNCTION get_project_from_user(user_id INT, project_id INT) 
RETURNS TABLE(name VARCHAR(20), git_url VARCHAR(255), description VARCHAR(2000), role role) AS $$
#variable_conflict use_variable
BEGIN
	RETURN QUERY 
	SELECT p.name, p.git_url, p.description, uhp.user_role 
	FROM project AS p
	INNER JOIN user_has_project uhp ON uhp.project_id = p.id
	WHERE p.id = project_id AND uhp.user_id = user_id;
END $$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS create_project(INT, VARCHAR(20), VARCHAR(255), VARCHAR(2000));
CREATE FUNCTION create_project(user_id INT, name VARCHAR(20), git_url VARCHAR(255) = NULL, description VARCHAR(2000) = NULL) 
RETURNS INT AS $$
DECLARE result INT DEFAULT 0;
BEGIN
	INSERT INTO project (name, git_url, description, creator_id) 
	VALUES (name, git_url, description, user_id) RETURNING id INTO result;
    	RETURN result;
END$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS edit_project(INT, VARCHAR(20), VARCHAR(255), VARCHAR(2000));
CREATE FUNCTION edit_project(project_id INT, name VARCHAR(20), git_url VARCHAR(255), description VARCHAR(2000)) 
RETURNS VOID AS $$
BEGIN
	UPDATE project
    	SET name = name, git_url = git_url, description = description
    	WHERE id = project_id;
END$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS delete_project(INT);
CREATE FUNCTION delete_project(project_id INT) 
RETURNS VOID AS $$
BEGIN
	DELETE FROM project WHERE id = project_id;
END$$ LANGUAGE plpgsql;

-------------------------------------------------------------------------------------------------------
------------------------------------- CRUD user_story -------------------------------------------------
-------------------------------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS get_user_stories_from_project(INT);
CREATE FUNCTION get_user_stories_from_project(project_id INT) 
RETURNS TABLE(name VARCHAR(20), description VARCHAR(500), priority priority, points INT, status status) AS $$
#variable_conflict use_variable
BEGIN
	RETURN QUERY 
	SELECT us.name, us.description, us.priority, us.points, us.status
	FROM user_story AS us
	WHERE us.project_id = project_id;
END $$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS create_user_story(INT, VARCHAR(20), VARCHAR(500), priority, INT, status);
CREATE FUNCTION create_user_story(project_id INT, name VARCHAR(20), description VARCHAR(500) = NULL, priority priority = 'medium', points INT = 1, status status = 'todo') 
RETURNS INT AS $$
DECLARE result INT DEFAULT 0;
BEGIN
	INSERT INTO user_story (project_id, name, description, priority, points, status) 
	VALUES (project_id, name, description, priority, points, status) RETURNING id INTO result;
	RETURN result;
END$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS edit_user_story(INT, VARCHAR(20), VARCHAR(500), priority, INT, status);
CREATE FUNCTION edit_user_story(user_story_id INT, name VARCHAR(20), description VARCHAR(500), priority priority, points INT, status status) 
RETURNS VOID AS $$
#variable_conflict use_variable
BEGIN
	UPDATE user_story
    	SET name = name, description = description, priority = priority, points = points, status = status
    	WHERE id = user_story_id;
END$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS delete_user_story(INT);
CREATE FUNCTION delete_user_story(user_story_id INT) 
RETURNS VOID AS $$
BEGIN
	DELETE FROM user_story WHERE id = user_story_id;
END$$ LANGUAGE plpgsql;

-------------------------------------------------------------------------------------------------------
------------------------------------- CRUD sprint -----------------------------------------------------
-------------------------------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS get_sprints_from_project(INT);
CREATE FUNCTION get_sprints_from_project(project_id INT) 
RETURNS TABLE(name VARCHAR(20), start_time TIMESTAMP(0), end_time TIMESTAMP(0)) AS $$
#variable_conflict use_variable
BEGIN
	RETURN QUERY 
	SELECT s.name , s.start_time, s.end_time
	FROM sprint AS s
	WHERE s.project_id = project_id;
END $$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS create_sprint(INT, VARCHAR(20), TIMESTAMP(0), TIMESTAMP(0));
CREATE FUNCTION create_sprint(project_id INT, name VARCHAR(20), start_time TIMESTAMP(0), end_time TIMESTAMP(0)) 
RETURNS INT AS $$
DECLARE result INT DEFAULT 0;
BEGIN
	INSERT INTO sprint (project_id, name, start_time, end_time) 
	VALUES (project_id, name, start_time, end_time) RETURNING id INTO result;
	RETURN result;
END$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS edit_sprint(INT, VARCHAR(20), TIMESTAMP(0), TIMESTAMP(0));
CREATE FUNCTION edit_sprint(sprint_id INT, name VARCHAR(20), start_time TIMESTAMP(0), end_time TIMESTAMP(0)) 
RETURNS VOID AS $$
#variable_conflict use_variable
BEGIN
	UPDATE sprint
    SET name = name, start_time = start_time, end_time = end_time
    WHERE id = sprint_id;
END$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS delete_sprint(INT);
CREATE FUNCTION delete_sprint(sprint_id INT) 
RETURNS VOID AS $$
BEGIN
	DELETE FROM sprint WHERE id = sprint_id;
END$$ LANGUAGE plpgsql;

-------------------------------------------------------------------------------------------------------
------------------------------------- CRUD task -----------------------------------------------------
-------------------------------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS get_tasks_from_sprint(INT);
CREATE FUNCTION get_tasks_from_sprint(sprint_id INT) 
RETURNS TABLE(description VARCHAR(500), status status, developer_id INT) AS $$
#variable_conflict use_variable
BEGIN
	RETURN QUERY 
	SELECT t.description, t.status, t.developer_id
	FROM task AS t
	WHERE t.sprint_id = sprint_id;
END $$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS create_task(INT, VARCHAR(500), status, INT);
CREATE FUNCTION create_task(sprint_id INT, description VARCHAR(500) = NULL, status status = 'todo', developer_id INT = 0) 
RETURNS INT AS $$
DECLARE result INT DEFAULT 0;
BEGIN
	INSERT INTO task (sprint_id, description, status, developer_id) 
	VALUES (sprint_id, description, status, developer_id) RETURNING id INTO result;
	RETURN result;
END$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS edit_task(INT, VARCHAR(500), status, INT);
CREATE FUNCTION edit_task(sprint_id INT, description VARCHAR(500), status status, developer_id INT) 
RETURNS VOID AS $$
#variable_conflict use_variable
BEGIN
	UPDATE sprint
    SET description = description, status = status, developer_id = developer_id
    WHERE id = sprint_id;
END$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS delete_task(INT);
CREATE FUNCTION delete_task(task_id INT) 
RETURNS VOID AS $$
BEGIN
	DELETE FROM task WHERE id = task_id;
END$$ LANGUAGE plpgsql;

-------------------------------------------------------------------------------------------------------
------------------------------------- CRUD build ------------------------------------------------------
-------------------------------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS get_builds_from_project(INT);
CREATE FUNCTION get_builds_from_project(project_id INT) 
RETURNS TABLE(path VARCHAR(255)) AS $$
#variable_conflict use_variable
BEGIN
	RETURN QUERY 
	SELECT b.path
	FROM build AS b
	WHERE b.project_id = project_id;
END $$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS create_build(INT, VARCHAR(255));
CREATE FUNCTION create_build(project_id INT, path VARCHAR(255)) 
RETURNS INT AS $$
DECLARE result INT DEFAULT 0;
BEGIN
	INSERT INTO build (project_id, path) 
	VALUES (project_id, name, path, size) RETURNING id INTO result;
	RETURN result;
END$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS edit_build(INT, VARCHAR(255));
CREATE FUNCTION edit_build(build_id INT, path VARCHAR(255)) 
RETURNS VOID AS $$
#variable_conflict use_variable
BEGIN
	UPDATE build
    SET path = path
    WHERE id = build_id;
END$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS delete_build(INT);
CREATE FUNCTION delete_build(build_id INT) 
RETURNS VOID AS $$
BEGIN
	DELETE FROM build WHERE id = build_id;
END$$ LANGUAGE plpgsql;

-------------------------------------------------------------------------------------------------------
------------------------------------- CRUD e2e_test ---------------------------------------------------
-------------------------------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS get_e2e_tests_from_project(INT);
CREATE FUNCTION get_e2e_tests_from_project(project_id INT) 
RETURNS TABLE(path VARCHAR(255)) AS $$
#variable_conflict use_variable
BEGIN
	RETURN QUERY 
	SELECT t.path
	FROM e2e_test AS t
	WHERE t.project_id = project_id;
END $$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS create_e2e_test(INT, VARCHAR(255));
CREATE FUNCTION create_e2e_test(project_id INT, path VARCHAR(255)) 
RETURNS INT AS $$
DECLARE result INT DEFAULT 0;
BEGIN
	INSERT INTO e2e_test (project_id, path) 
	VALUES (project_id, path) RETURNING id INTO result;
	RETURN result;
END$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS edit_e2e_test(INT, VARCHAR(255));
CREATE FUNCTION edit_e2e_test(e2e_test_id INT, path VARCHAR(255)) 
RETURNS VOID AS $$
#variable_conflict use_variable
BEGIN
	UPDATE e2e_test
    SET path = path
    WHERE id = e2e_test_id;
END$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS delete_e2e_test(INT);
CREATE FUNCTION delete_e2e_test(e2e_test_id INT) 
RETURNS VOID AS $$
BEGIN
	DELETE FROM e2e_test WHERE id = e2e_test_id;
END$$ LANGUAGE plpgsql;
