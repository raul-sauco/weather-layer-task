// Require necessary modules.
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

// Define a task to process SCSS to CSS.
gulp.task("sass", function () {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
});

// Define a task to watch for changes in SCSS files.
gulp.task("watch", function () {
  gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
});

// Define a task to copy HTML files.
gulp.task("html", function () {
  return gulp.src("src/**/*.html").pipe(gulp.dest("dist"));
});

// Define a task to copy JS files.
gulp.task("js", function () {
  return gulp.src("src/js/**/*.js").pipe(gulp.dest("dist/js"));
});

// Copy binary data to the dist folder.
gulp.task("copy-resources", function () {
  return gulp.src("res/**/*").pipe(gulp.dest("dist"));
});

// Define a task to watch for changes.
gulp.task("watch", function () {
  gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
  gulp.watch("src/**/*.html", gulp.series("html"));
  gulp.watch("src/js/**/*.js", gulp.series("js"));
  gulp.watch("res/**/*", gulp.series("copy-resources"));
});

// Define the default task.
gulp.task("default", gulp.series("sass", "html", "js", "watch"));
