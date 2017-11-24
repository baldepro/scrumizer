DROP FUNCTION IF EXISTS get_projects_from_user(INT);
CREATE FUNCTION get_projects_from_user(user_id INT) 
RETURNS TABLE(name VARCHAR(20), git_url VARCHAR(255), description VARCHAR(2000), role role) AS $$
#variable_conflict use_variable
BEGIN
	RETURN QUERY 
	SELECT project.name, project.git_url, project.description, user_has_project.user_role FROM project
	INNER JOIN user_has_project ON (project.id = user_has_project.project_id)
	WHERE user_has_project.user_id = user_id;
END $$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS get_project_from_user(INT, INT);
CREATE FUNCTION get_project_from_user(user_id INT, project_id INT) 
RETURNS TABLE(name VARCHAR(20), git_url VARCHAR(255), description VARCHAR(2000), role role) AS $$
#variable_conflict use_variable
BEGIN
	RETURN QUERY 
	SELECT project.name, project.git_url, project.description, user_has_project.user_role FROM project
	INNER JOIN user_has_project ON user_has_project.project_id = project.id
	WHERE project.id = project_id AND user_has_project.user_id = user_id;
END $$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS create_project(INT, VARCHAR(20), VARCHAR(255), VARCHAR(2000));
CREATE FUNCTION create_project(user_id INT, name VARCHAR(20), git_url VARCHAR(255) DEFAULT NULL, description VARCHAR(2000) DEFAULT NULL) 
RETURNS INT AS $$
DECLARE result INT DEFAULT 1;
BEGIN
	INSERT INTO project (name, git_url, description, creator_id) 
	VALUES (name, git_url, description, user_id) RETURNING 0 INTO result;
    	RETURN result;
END$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS edit_project(INT, VARCHAR(20), VARCHAR(255), VARCHAR(2000));
CREATE FUNCTION edit_project(project_id INT, name VARCHAR(20), git_url VARCHAR(255), description VARCHAR(2000)) 
RETURNS INT AS $$
DECLARE result INT DEFAULT 1;
BEGIN
	UPDATE project
    	SET name = name, git_url = git_url, description = description
    	WHERE id = project_id
    	RETURNING 0 INTO result;
    	RETURN result;
END$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS delete_project(INT);
CREATE FUNCTION delete_project(project_id INT) 
RETURNS INT AS $$
DECLARE result INT DEFAULT 1;
BEGIN
	DELETE FROM project WHERE id = project_id RETURNING 0 INTO result;
    	RETURN result;
END$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS create_user(VARCHAR(20), role);
CREATE FUNCTION create_user(name VARCHAR(20), role role DEFAULT 'developer') 
RETURNS INT AS $$
DECLARE result INT DEFAULT 1;
BEGIN
	INSERT INTO "user" (name) 
	VALUES (name) RETURNING 0 INTO result;
    	RETURN result;
END$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS edit_user(INT, VARCHAR(20));
CREATE FUNCTION edit_user(user_id INT, name VARCHAR(20)) 
RETURNS INT AS $$
DECLARE result INT DEFAULT 1;
BEGIN
	UPDATE "user"
    	SET name = name
    	WHERE id = user_id
    	RETURNING 0 INTO result;
    	RETURN result;
END$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS delete_user(INT);
CREATE FUNCTION delete_user(user_id INT) 
RETURNS INT AS $$
DECLARE result INT DEFAULT 1;
BEGIN
	DELETE FROM "user" WHERE id = user_id RETURNING 0 INTO result;
    	RETURN result;
END$$ LANGUAGE plpgsql;
