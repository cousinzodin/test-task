"use strict";

var gulp = require("gulp");
var server = require("browser-sync").create();
var run = require("run-sequence");
var del = require("del");

gulp.task("serve", function () {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("*.html").on("change", server.reload);
});

gulp.task("copy", function () {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "js/**",
    "*.html",
    "*.js"
  ], {
      base: "."
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", function (fn) {
  run("clean", "copy", fn);
});

gulp.task('build', gulp.series('clean', 'copy',  function (fn) {
  fn();
}));
