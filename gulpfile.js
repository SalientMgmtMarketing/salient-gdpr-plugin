'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('concatScripts', function () {
  return gulp.src([
    '!./assets/js/compiled/*.js',
    './node_modules/js-cookie/src/js.cookie.js',
    './assets/js/**/*.js'
  ])
    .pipe(maps.init())
    .pipe(concat('scripts.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('./assets/js/compiled'));
});

gulp.task('minifyScripts', ['concatScripts'], function () {
  return gulp.src('./assets/js/compiled/scripts.js')
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js/compiled/'));
});

gulp.task('compileSass', function () {
  return gulp.src('./assets/sass/**/*.scss')
    .pipe(maps.init())
    .pipe(sass({includePaths: require('bourbon').includePaths}))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(maps.write('./assets/sass/'))
    .pipe(gulp.dest('./assets/sass/'));
});

gulp.task('watchFiles', function(){
  gulp.watch(['./assets/sass/**/*.scss'],['compileSass']);
  gulp.watch(['./assets/js/*.js'], ['concatScripts']);
});






gulp.task('build', ['concatScripts', 'minifyScripts', 'compileSass']);

gulp.task('watch', ['watchFiles']);

gulp.task('default', ['concatScripts', 'compileSass']);
