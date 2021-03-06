const gulp = require('gulp');
const plumber = require('gulp-plumber');
const through = require('through2');
const newer = require('gulp-newer');
const babel = require('gulp-babel');
const gulpWatch = require('gulp-watch');
const sourcemaps = require('gulp-sourcemaps');
const { Signale, chalks } = require('@frontendmonster/dev-utils/logger');

const gulpLogger = Signale('gulp');
const source = './src/**/*.js';

const compilationLogger = () => through.obj((file, _, callback) => {
  gulpLogger.success(`Compiling '${chalks.processing(file.relative)}'...`);
  callback(null, file);
});

const logErrors = () => plumber({
  errorHandler(err) {
    gulpLogger.error(err.stack);
  },
});

const build = () => gulp
  .src(source)
  .pipe(logErrors())
  .pipe(newer({ dest: './dist' }))
  .pipe(compilationLogger())
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./dist'));

const watchBuild = () => gulpWatch(source, { debounceDelay: 200 }, gulp.task('build'));

gulp.task('build', build);

gulp.task('watch', gulp.series('build', watchBuild));

gulp.task('default', gulp.series('build'));
