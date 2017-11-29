DROP ROLE IF EXISTS scrumizer;
CREATE ROLE scrumizer LOGIN PASSWORD 'bordeaux-cdp-2017';

GRANT CONNECT 
ON DATABASE scrum 
TO scrumizer;

GRANT USAGE 
ON SCHEMA public 
TO scrumizer;

GRANT EXECUTE 
ON ALL FUNCTIONS 
IN SCHEMA public 
TO scrumizer;

REVOKE EXECUTE 
ON FUNCTION add_user_has_project()
FROM scrumizer 
CASCADE;

