const gulp = require('gulp');
const gNodemon = require('gulp-nodemon')
const cCSS = require('gulp-clean-css');
const cPrefix = require('gulp-autoprefixer')

//Cheun helped me writing this code.
//I watched this video for instructions: https://www.youtube.com/watch?v=LYbt50dhTko

gulp.task('css', () => (
    gulp.src('./public/css/*.css')
    .pipe(cCSS({
        compatibility: 'ie8'
    }))
    .pipe(cPrefix({
        cascade: false
    }))
    .pipe(gulp.dest('public/dist/styles'))
))

gulp.task('watch', () => (
    gulp.watch('./public/css/*.css', gulp.series('css'))
))

gulp.task('start', (done) => (
    gNodemon({
        script: 'server.js',
        ext: 'css',
        tasks: ['css'],
        ignore: ['public/dist/styles'],
        done: done
    })
))

gulp.task('default', gulp.series('css', 'start'))