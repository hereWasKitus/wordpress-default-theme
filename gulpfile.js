const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const minify = require('gulp-minify');


function browsersync() {
  browserSync.init({
    proxy: "http://project-name.loc"
  });
}

function scss() {
  return src('assets/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(dest('assets/css'))
    .pipe(browserSync.stream());
}

function js() {
  return src('assets/js/modules/*.js')
    .pipe(concat('index.js'))
    .pipe(minify())
    .pipe(dest('assets/js/'))
    .pipe(browserSync.stream());
}

function startWatch() {
  watch(['**/*.php']).on('change', browserSync.reload);
  watch('assets/js/modules/*.js', js);
  watch('assets/scss/**/*.scss', scss);
}

exports.default = parallel(scss, js, browsersync, startWatch);