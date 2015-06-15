var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var lazypipe = require('lazypipe');

var scripts = '{src,test}/**/*.js';

function jshintOn(src) {
  return src.pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
}

gulp.task('jshint', function() {
  jshintOn(gulp.src(scripts));
});

function test() {
  return gulp.src(scripts, {read: false})
    .pipe(mochaRun());
}

var mochaRun = lazypipe()
  .pipe($.mocha, {ui: 'tdd'})()
  .on('error', function(err) {
    $.util.log(err.toString());
});

gulp.task('test', ['jshint'], test);

gulp.task('serve', function() {
  gulp.watch([scripts], function(e) {
    // TODO: If clean, files aren't piped after jshint?
    gulp.src(e.path)
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'))
      .pipe(mochaRun);
  });
});

gulp.task('default', ['jshint', 'test', 'serve']);
