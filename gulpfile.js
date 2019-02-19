function defaultTask(cb) {
    // place code for your default task here
    cb();
}

// exports.default = defaultTask;

// task for minify css, use gulp minify-css command
let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');

gulp.task('minify', () => {
    return gulp.src('app/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', () => {
    return gulp.src('app/css/*.css')
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(gulp.dest('dist'));
});

// task for minify js, use gulp minify-js command
var minifyjs = require('gulp-js-minify');
// gulp.task('minify-js', function(){
//     return gulp.src('app/js/hangman.js')
//         .pipe(minifyjs())
//         .pipe(gulp.dest('dist'));
// });

gulp.task('minify-js', () => {
    return gulp.src('app/js/hangman.js')
        .pipe(minifyjs({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});
//task for localhost connection with gulp command
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    gulp.src('app')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});

