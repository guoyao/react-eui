var gulp = require('gulp');
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
var rename = require('gulp-rename');
 
gulp.task('less', function () {
    gulp.src('src/css/react-eui.less')
        .pipe(less())
        .pipe(gulp.dest('lib/css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('lib/css'));
});