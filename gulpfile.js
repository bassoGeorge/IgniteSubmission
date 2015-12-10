var gulp = require('gulp');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var ereplace = require('gulp-ext-replace');

var jade = require('gulp-jade');

var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');


var paths = {
  sass: ['./sass/**/*.sass', './sass/**/*.scss'],
  coffee: ['./coffee/main.coffee', './coffee/**/*.coffee'],
  jade: ['./jade/**/*.jade'],
  
  lib_js: [
    'bower_components/angular/angular.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/foundation-apps/dist/js/foundation-apps.js'
  ]  // Add all your library files  to this list, will be prepended to your final js file
};

gulp.task('default', ['sass', 'jade', 'coffee:final']);

gulp.task('watch', ['default'], function() {
  gulp.watch(paths.sass, ['sass']);
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
    .pipe(concat('application.js'))
    .pipe(gulp.dest('./js/'))
    .on('end', done);

});

// Concat lib files for coffee
gulp.task('coffee:final', ['coffee:base'], function(done) {
  gulp.src(paths.lib_js.concat(['./js/application.js']))
    .pipe(plumber({
      errorHandler: function (err) {
        gutil.log(err);
        this.emit('end');
      }
    }))
    .pipe(concat('completeApp.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'))
    .on('end', done);
});

// Sass compilation
gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(plumber({
      errorHandler: function (err) {
        gutil.log(err);
        this.emit('end');
      }
    }))
    .pipe(sass())
    .pipe(gulp.dest('./css/'))
    .pipe(minifyCss())
    .pipe(ereplace('.min.css'))
    .pipe(gulp.dest('./css/'))
    .on('end', done);
});

/* Small project so no need for compass
var devNull = require('dev-null');
var compass = require('gulp-compass');

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
}); */
