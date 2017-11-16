const cp = require('child_process')

cp.exec('mysql -u root -p test src/server/database/scumdb_tables.sql', (error, stdout, stderr) => {
  if (error) throw error
  console.log(`stdout: ${stdout}`)
  console.log(`stderr: ${stderr}`)
})
