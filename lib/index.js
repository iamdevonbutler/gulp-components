'use strict';

// var concat = require('concat-stream');
// var through = require('through2');
var gutil = require('gulp-util');
var fileInclude = require('gulp-file-include');
var EOL = require('os').EOL;
var path = require('path');
var fs = require('fs');

module.exports = function(options) {
  // Normalize options.
  options = options || {};

  if (!options.componentsPath) {
    return new gutil.PluginError('gulp-components', '`componentsPath` config option not set.');
  }

  options = Object.assign({}, {
    componentsPath: path.join(process.cwd(), options.componentsPath),
    scssPath: options.scssPath ? path.join(process.cwd(), options.scssPath) : '',
    jsPath: options.jsPath ? path.join(process.cwd(), options.jsPath) : '',
    fileIncludeOptions: {},
  }, options);

  // Build components list.
  var componentList = getAllComponents(options.componentsPath);
  componentList = componentList && componentList.length ? componentList : [];

  // Concat all JS.
  var js = '';
  componentList.forEach(function(componentName) {
    var fileContents = fs.readFileSync(path.join(options.componentsPath, componentName, componentName + '.js'));
    js += fileContents ? fileContents + EOL : '';
  });
  fs.writeFileSync(path.join(options.jsPath, 'components.js'), js);

  // Build SCSS file.
  fs.writeFileSync(path.join(options.scssPath, '_components.scss'), (function() {
    return componentList.length
      ? componentList.map(function(componentName) {
        var relativePath = path.join(path.relative(options.scssPath, options.componentsPath), '_' + componentName + '.scss');
        return `@import '${relativePath}';`;
      }).join(EOL)
      : '';
  })());

  // Build HTML.
  return fileInclude(options.fileIncludeOptions);
}

function getAllComponents(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}
