DROP FUNCTION IF EXISTS add_user_has_project() CASCADE;
CREATE FUNCTION add_user_has_project()
RETURNS TRIGGER AS $$
BEGIN
	INSERT INTO user_has_project (user_id, project_id) 
	VALUES (NEW.creator_id, NEW.id);
	RETURN NEW;
END $$ LANGUAGE plpgsql; 


DROP TRIGGER IF EXISTS after_insert_project ON project;
CREATE TRIGGER after_insert_project AFTER INSERT ON project
 FOR EACH ROW EXECUTE PROCEDURE add_user_has_project();

--------------------------------------------------------------
--------------------------------------------------------------

