DROP TYPE IF EXISTS role CASCADE;
CREATE TYPE role AS ENUM ('developer', 'product_owner');

DROP TYPE IF EXISTS priority CASCADE;
CREATE TYPE priority AS ENUM ('high', 'low', 'medium');

DROP TYPE IF EXISTS status CASCADE;
CREATE TYPE status AS ENUM ('done', 'todo', 'work_in_progress');

DROP TABLE IF EXISTS "user" CASCADE;
CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  name varchar(20) UNIQUE NOT NULL
) ;

DROP TABLE IF EXISTS project CASCADE;
CREATE TABLE project (
  id SERIAL PRIMARY KEY,
  name varchar(20) UNIQUE NOT NULL,
  git_url varchar(255),
  description varchar(2000) DEFAULT NULL,
  creator_id SERIAL REFERENCES "user" (id) ON DELETE CASCADE
) ;

DROP TABLE IF EXISTS build CASCADE;
CREATE TABLE build (
  id SERIAL PRIMARY KEY,
  path varchar(255) NOT NULL ,
  project_id SERIAL REFERENCES project (id) ON DELETE CASCADE
) ;

DROP TABLE IF EXISTS e2e_test CASCADE;
CREATE TABLE e2e_test (
  id SERIAL PRIMARY KEY,
  path varchar(255) NOT NULL,
  project_id SERIAL REFERENCES project (id) ON DELETE CASCADE
) ;

DROP TABLE IF EXISTS sprint CASCADE;
CREATE TABLE sprint (
  id SERIAL PRIMARY KEY,
  name varchar(20) UNIQUE NOT NULL,
  start_time timestamp(0) NOT NULL,
  end_time timestamp(0) CHECK(start_time < end_time) NOT NULL,
  project_id SERIAL REFERENCES project(id) ON DELETE CASCADE
) ;

DROP TABLE IF EXISTS task CASCADE;
CREATE TABLE task (
  id SERIAL PRIMARY KEY,
  description varchar(500) DEFAULT NULL,
  status status NOT NULL DEFAULT 'todo',
  developer_id SERIAL REFERENCES "user"(id) ON DELETE CASCADE,
  sprint_id SERIAL REFERENCES sprint(id) ON DELETE CASCADE,
  UNIQUE (developer_id,sprint_id)
) ;

DROP TABLE IF EXISTS user_has_project CASCADE;
CREATE TABLE user_has_project (
  id SERIAL PRIMARY KEY,
  user_id SERIAL REFERENCES "user"(id) ON DELETE CASCADE,
  user_role role NOT NULL DEFAULT 'developer',
  project_id SERIAL REFERENCES project (id) ON DELETE CASCADE,
  UNIQUE (user_id, user_role, project_id)
) ;

DROP TABLE IF EXISTS user_story CASCADE;
CREATE TABLE user_story (
  id SERIAL PRIMARY KEY,
  name varchar(20) UNIQUE NOT NULL,
  description varchar(500) DEFAULT NULL,
  priority priority NOT NULL DEFAULT 'medium',
  points int CHECK(points >= 0) NOT NULL DEFAULT '0',
  status status NOT NULL DEFAULT 'todo',
  project_id SERIAL REFERENCES project(id) ON DELETE CASCADE
) ;

DROP TABLE IF EXISTS user_story_has_build CASCADE;
CREATE TABLE user_story_has_build (
  id SERIAL PRIMARY KEY,
  user_story_id SERIAL REFERENCES user_story (id) ON DELETE CASCADE,
  build_id SERIAL REFERENCES build (id) ON DELETE CASCADE,
  UNIQUE (user_story_id, build_id)
) ;

DROP TABLE IF EXISTS user_story_has_e2e_test CASCADE;
CREATE TABLE user_story_has_e2e_test (
  id SERIAL PRIMARY KEY,
  user_story_id SERIAL REFERENCES user_story(id) ON DELETE CASCADE,
  e2e_test_id SERIAL REFERENCES e2e_test(id) ON DELETE CASCADE,
  UNIQUE (user_story_id, e2e_test_id)
) ;
