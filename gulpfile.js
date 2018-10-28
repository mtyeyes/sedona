"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var rename = require("gulp-rename");
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');

gulp.task("html", function () {
  return gulp.src("source/*.html")
  .pipe(posthtml([
    include()
  ]))
  .pipe(gulp.dest("build"));
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("img", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 4}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/2container/*.svg")
  .pipe(imagemin([imagemin.svgo()]))
  .pipe(svgstore({inlineSvg: true}))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("clean", function (){
  return del("build");
});

gulp.task("jsIndex", function() {
  return gulp.src(["source/js/menu.js", "source/js/picturefill.min.js", "source/js/svg4everybody.js"])
    .pipe(concat("script.js"))
    .pipe(uglify())
    .pipe(gulp.dest("build/js/"));
});

gulp.task("jsFeedback", function() {
  return gulp.src(["source/js/menu.js", "source/js/feedback.js", "source/js/picturefill.min.js", "source/js/svg4everybody.js"])
    .pipe(concat("feedback.js"))
    .pipe(uglify())
    .pipe(gulp.dest("build/js/"));
});

gulp.task("copy", function (){
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/*.*"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("scripts", gulp.series("jsIndex", "jsFeedback"));

gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "scripts", "html"));

gulp.task("start", gulp.series("build", "server"));
