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
    let sql = 'SELECT * FROM scrumdb.project WHERE creator_id=(SELECT id FROM scrumdb.user WHERE name="' + body.ownerName + '")'
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

    console.log(sql)

    return sql
  },

  delete: function (id) {
    return 'DELETE FROM scrumdb.project WHERE id=' + id
  }
}
