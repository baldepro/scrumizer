let childProcess = require('child_process')

function installModules (modules, callback) {
  if (modules.length === 0) {
    if (callback) {
      callback(null) // returns the callback if there is no module to install
    }
    return
  }

  var module = modules.shift()

  childProcess.exec('npm i -D ' + module, {}, function (error, stdout, stderr) {
    process.stdout.write(stdout + '\n')
    process.stderr.write(stderr + '\n')
    if (error !== null) {
      if (callback) callback(error)
    } else {
      installModules(modules, callback)
    }
  }
)
}

// Execution
installModules([
  'webpack',
  'webpack-dev-server',
  'babel-loader',
  'babel-core',
  'babel-preset-env',
  'angular',
  'angular-ui-router',
  'express',
  'html-loader',
  'eslint-loader',
  'body-parser',
  'standard-loader',
  'clean-webpack-plugin',
  'css-loader',
  'style-loader',
  'postcss-loader',
  'file-loader',
  'uglifyjs-webpack-plugin',
  'extract-text-webpack-plugin'
])
