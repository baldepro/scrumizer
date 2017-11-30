const util = require('util')

exports.user = {
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

    if (body.email) sql += 'email="' + body.email + '" '

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
    return 'SELECT * FROM scrumdb.project WHERE name="' + body.name + '"'
  },

  add: function (body) {
    let sql = 'INSERT INTO scrumdb.project (name, git_url, description, creator_id) VALUES'
    sql += util.format('("%s", "%s", "%s", %d)', body.name, body.gitUrl, body.description, body.creatorId)
    return sql
  },

  update: function (body) {
    let sql = 'UPDATE scrumdb.project SET '

    if (body.name) sql += 'name="' + body.name + '", '
    if (body.gitUrl) sql += 'git_url="' + body.gitUrl + '", '
    if (body.description) sql += 'description="' + body.decription + '", '

    sql += 'WHERE id="' + body.id + '"'

    return sql
  },

  delete: function (id) {
    return 'DELETE FROM scrumdb.project WHERE id="' + id + '"'
  }
}
