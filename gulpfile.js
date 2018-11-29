var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    prettyHtml = require("gulp-pretty-html"),
    pug = require("gulp-pug");

gulp.task('sass', function () {
  return gulp.src('app/scss/*.+(sass|scss)')
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefixer({
      browsers: ['last 20 versions'],
      cascade: false
    }))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('watch', ['browser-sync', 'sass', 'pug'], function () {
  gulp.watch('app/scss/*.+(sass|scss)', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch("app/pug/*.pug", ['pug']);
});

gulp.task('pug', function() {
  return gulp.src('app/pug/*.pug')
  .pipe(pug())
  .pipe(prettyHtml({ indent_size: 2, extra_liners:[] }))
  .pipe(gulp.dest('app'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('finished', ['sass'], function() {
  gulp.src('app/css/*.css')
  .pipe(gulp.dest('dist/css'))
  gulp.src('app/*.html')
  .pipe(gulp.dest('dist/'))
  gulp.src('app/img')
  .pipe(gulp.dest('dist/img'))
})
