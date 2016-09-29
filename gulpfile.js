'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var jshint = require('gulp-jshint');
var pump = require('pump');


gulp.task('sass', function () {
    return gulp.src('./dev/sass/main.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./src'));
});

gulp.task('lint', function() {
    return gulp.src('./dev/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('compress-js', ['lint'], function() {

    gulp.src('./dev/js/main.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./src'))
});


gulp.task('watch', function () {
    gulp.watch(['./dev/sass/**/*.scss', './dev/js/**/*.js'], ['sass', 'compress-js']);
});