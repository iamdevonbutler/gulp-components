# gulp-components (alpha)

Write front-end components for your more basic static/semi-static websites.

## Use case

Simple sites w/ a small to moderate level of complexity can benefit from the structure provided by powerful web frameworks, such as [React](https://github.com/facebook/react), yet they can do w/o the complexity and code bloat. **gulp-components** let's you build basic components that encapsulate `HTML`, `JS`, and `SCSS` into modules that can be included elsewhere in your HTML.

## How it works

If you're using [gulp](https://github.com/gulpjs/gulp) and `SCSS` then **gulp-components** might be for you!


this is really a set of conventions w/ a little gulp help.

1) Create a directory to store your components.
2) Create a component.
3) Include your component style file in your SASS code.
4) Include your




### 1) Configure `gulpfile`



```
// gulpfile.babel.js

import gulpComponents from 'gulp-components';

gulp.task('html', () => {
  return gulp.src('app/index.html')
    .pipe(gulpComponents({
      scssPath: 'app/styles/vendor', // Optional
      jsPath: 'app/scripts', // Optional

      scssFilename: 'components', // Default: '_components.scss'
      jsFilename: 'components', // Default: 'components.js'
      componentsDirName: 'components', // Default: 'components'
      componentsDirPath: '' // Default: src path
    }))
    .pipe(gulp.dest('dist'));
});


```


2) Create a directory to store your `components`.

3) Create a component.

**gulp-components** uses the [gulp-file-include](https://github.com/coderhaoxin/gulp-file-include) package to modularize your HTML. This lets you do stuff like this (note the `@@include` syntax):

```
<!-- index.html -->

<!DOCTYPE html>
<html>
  <body>
  @@include('./view.html')
  @@include('./var.html', {
    "name": "haoxin",
    "age": 12345,
    "socials": {
      "fb": "facebook.com/include",
      "tw": "twitter.com/include"
    }
  })
  </body>
</html>

```

By adding **gulp-components** to your `HTML` task, you will also be able to leverage the file include

## License

MIT
