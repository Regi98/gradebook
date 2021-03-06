'use strict';
/*******************************************************
          NODE MODULES
*******************************************************/
var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var runSequence = require('run-sequence');
var replace = require('gulp-replace');
var injectPartials = require('gulp-inject-partials');
var BROWSER_SYNC_RELOAD_DELAY = 500;
/*******************************************************
          GULP TASKS
*******************************************************/
gulp.task('nodemon',['inject'], function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: 'server.js',

    // watch core server file(s) that require server restart on change
    watch: ['server.js']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});
gulp.task('browser-sync', ['nodemon'], function () {

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,

    // open the proxied app in chrome
    browser: ['chrome']
  });
});
gulp.task('js',  function () {
  return gulp.src('public/**/*.js')
    // do stuff to JavaScript files
    //.pipe(uglify())
    //.pipe(gulp.dest('...'));
});
gulp.task('css', function () {
  return gulp.src('public/**/*.css')
    .pipe(browserSync.reload({ stream: true }));
})
gulp.task('bs-reload', function () {
  browserSync.reload();
});
gulp.task('inject', function() {
  runSequence('injectPartial', 'replacePath');
});
gulp.task('injectPartial', function () {
  return gulp.src("./public/*.html")
    .pipe(injectPartials())
    .pipe(gulp.dest("./public"));
});
gulp.task('replacePath', function(){
  gulp.src('public/*.html', { base: "./" })
    .pipe(replace('src="images/', 'src="../images/'))
    .pipe(replace('href="index.html"', 'href="/"'))
    .pipe(gulp.dest('.'));
});
gulp.task('default', ['browser-sync'], function () {
  gulp.watch('public/**/*.js',   ['js', browserSync.reload]);
  gulp.watch('public/**/*.css',  ['css']);
  gulp.watch('public/**/*.html', ['bs-reload']);
});
