var gulp = require('gulp');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var devNull = require('dev-null');

var jade = require('gulp-jade');

var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var compass = require('gulp-compass');
var minifyCss = require('gulp-minify-css');


var paths = {
  sass: ['./sass/**/*.sass', './sass/**/*.scss'],
  coffee: ['./coffee/app.coffee', './coffee/**/*.coffee'],
  jade: ['./jade/**/*.jade'],
  
  lib_js: []  // Add all your library files (minified ones only) to this list, will be prepended to your final js file
}

gulp.task('default', ['compass', 'jade', 'coffee:final'])

gulp.task('watch', ['default'], function() {
  gulp.watch(paths.sass, ['compass']);
  gulp.watch(paths.coffee, ['coffee:final']);
  gulp.watch(paths.jade, ['jade']);
});


// Jade task
gulp.task('jade', function(done) {
  gulp.src(paths.jade)
    .pipe(plumber({
      errorHandler: function (err) {
        gutil.log(err);
        this.emit('end');
      }
    }))
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./'))
    .on('end', done);
});

// Base coffee script task
gulp.task('coffee:base', function(done) {
  gulp.src(paths.coffee)
    .pipe(plumber({
      errorHandler: function (err) {
        gutil.log(err);
        this.emit('end');
      }
    }))
    .pipe(coffee())
    .pipe(gulp.dest('./js/'))
    .pipe(concat('application.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'))
    .on('end', done);

});

// Concat lib files for coffee
gulp.task('coffee:final', ['coffee:base'], function(done) {
  gulp.src(paths.lib_js.concat(['./js/application.min.js']))
    .pipe(plumber({
      errorHandler: function (err) {
        gutil.log(err);
        this.emit('end');
      }
    }))
    .pipe(concat('completeApp.min.js'))
    .pipe(gulp.dest('./js'))
    .on('end', done);
});


// Compass compiling
gulp.task('compass', function(done){
  gulp.src(paths.sass)
    .pipe(plumber({
      errorHandler: function (err) {
        gutil.log(err);
        this.emit('end');
      }
    }))
    .pipe(compass({
      config_file: './config.rb',
    }))
    .pipe(plumber.stop())     // A hack to get it working
    .pipe(devNull().on('error', function() {this.emit('end')}))
    .on('end', done);
});
