// Require necessary modules
const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));

// Define a task to process SCSS to CSS
gulp.task("sass", function () {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
});

// Define a task to watch for changes in SCSS files
gulp.task("watch", function () {
  gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
});

// Define the default task
gulp.task("default", gulp.series("sass", "watch"));
