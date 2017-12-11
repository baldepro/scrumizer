const util = require('util')

exports.user = {
  getAll: function () {
    return 'SELECT name FROM scrumdb.user'
  },

  get: function (name) {
    return 'SELECT * FROM scrumdb.user WHERE name="' + name + '"'
  },

  add: function (body) {
    let sql = 'INSERT INTO scrumdb.user (name, email, password) VALUES'
    sql += util.format('("%s", "%s", "%s")', body.name, body.email, body.password)
    return sql
  },

  update: function (body) {
    let sql = 'UPDATE scrumdb.user SET '

    if (body.email) sql += 'email="' + body.email + '", '

    if (body.password) sql += 'password="' + body.password + '" '

    sql += 'WHERE name="' + body.name + '"'

    return sql
  },

  delete: function (body) {
    return 'DELETE FROM scrumdb.user WHERE name="' + body.name + '"'
  }
}

exports.project = {
  get: function (body) {
    let sql = 'SELECT * FROM scrumdb.project WHERE id IN (SELECT project_id FROM scrumdb.user_has_project WHERE user_id=(SELECT id FROM scrumdb.user WHERE name="' + body.ownerName + '"))'
    return sql
  },

  add: function (body) {
    let sql = 'INSERT INTO scrumdb.project (name, git_url, description, creator_id)'
    sql += util.format('SELECT "%s", "%s", "%s", ', body.name, body.git, body.description)
    sql += 'id   FROM scrumdb.user  WHERE name="' + body.ownerName + '"'
    return sql
  },

  update: function (body) {
    let sql = 'UPDATE scrumdb.project SET '

    sql += 'name="' + body.name + '", '
    sql += 'git_url="' + body.git + '", '
    sql += 'description="' + body.description + '" '
    sql = sql.replace(/,\s*$/, '')
    sql += 'WHERE id=' + body.id

    return sql
  },

  delete: function (id) {
    return 'DELETE FROM scrumdb.project WHERE id=' + id
  }
}

exports.member = {

  getAll: function (body) {
    let sql = 'SELECT name FROM scrumdb.user WHERE id IN (SELECT user_id FROM scrumdb.user_has_project WHERE project_id=' + body.projectId + ')'
    return sql
  },

  get: function (body) {
    let sql = 'SELECT * FROM scrumdb.user_has_project WHERE creator_id=(SELECT id FROM scrumdb.user WHERE name="' + body.ownerName + '")'
    return sql
  },

  add: function (body) {
    let sql = 'INSERT INTO scrumdb.user_has_project (user_id, user_role, project_id) '
    sql += util.format('SELECT id, \'%s\', %d ', body.userRole, body.projectId)
    sql += 'FROM scrumdb.user  WHERE name="' + body.username + '"'
    return sql
  },

  update: function (body) {
    let sql = 'UPDATE scrumdb.project SET '

    sql += 'name="' + body.name + '", '
    sql += 'git_url="' + body.git + '", '
    sql += 'description="' + body.description + '" '
    sql = sql.replace(/,\s*$/, '')
    sql += 'WHERE id=' + body.id

    return sql
  },

  delete: function (id) {
    return 'DELETE FROM scrumdb.project WHERE id=' + id
  }
}

exports.userStory = {
  get: function (body) {
    let sql = 'SELECT * FROM scrumdb.user_story WHERE project_id=' + body.projectId
    return sql
  },

  add: function (body) {
    let sql = 'INSERT INTO scrumdb.user_story (description, priority, points, status, project_id) VALUES '
    sql += util.format('("%s", \'%s\', %d, \'%s\', %d)', body.description, body.priority, body.points, body.status, body.projectId)

    console.log(sql)
    return sql
  },

  update: function (body) {
    let sql = 'UPDATE scrumdb.user_story SET '

    if (body.description) sql += 'description="' + body.description + '", '
    if (body.priority) sql += 'priority=\'' + body.priority + '\', '
    if (body.points) sql += 'points=' + body.points + ', '
    if (body.status) sql += 'status="' + body.status + '" '
    sql = sql.replace(/,\s*$/, '')
    sql += 'WHERE id=' + body.id

    return sql
  },

  delete: function (id) {
    return 'DELETE FROM scrumdb.user_story WHERE id=' + id
  }
}
