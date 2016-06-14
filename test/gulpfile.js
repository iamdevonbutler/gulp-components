var gulp = require('gulp');
var del = require('del');
var components = require('../lib');

gulp.task('clean', del.bind(null, '.tmp'));

gulp.task('html', ['clean'], () => {
  return gulp.src('app/*.html')
    .pipe(components({
      componentsPath: 'app/components',
      scssPath: 'app/styles',
      jsPath: 'app/scripts',
      fileIncludeOptions: {
        prefix: '@@',
        basepath: '@file',
      },
    }))
    .pipe(gulp.dest('.tmp'));
});
