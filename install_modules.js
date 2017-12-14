let childProcess = require('child_process')

function installModules (modules, callback) {
  if (modules.length === 0) {
    if (callback) {
      callback(null) // returns the callback if there is no module to install
    }
    return
  }

  var module = modules.shift()

  childProcess.exec('npm i -S ' + module, {}, function (error, stdout, stderr) {
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
  'angular',
  'angular-ui-router',
  'babel-core',
  'babel-eslint',
  'babel-loader',
  'babel-preset-env',
  'body-parser',
  'bootstrap-loader',
  'bootstrap-sass',
  'clean-webpack-plugin',
  'css-loader',
  'express',
  'extract-text-webpack-plugin',
  'file-loader',
  'html-loader',
  'imports-loader',
  'node-sass',
  'postcss-loader',
  'protractor',
  'resolve-url-loader',
  'sass-loader',
  'standard-loader',
  'style-loader',
  'uglifyjs-webpack-plugin',
  'url-loader',
  'webpack',
  'webpack-dev-server',
  'lodash',
  'mysql',
  'webdriver-manager',
  'protractor'
])
