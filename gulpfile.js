const pkg = require('./package.json');
const gulp = require('gulp');
const gulpTypsceript = require('gulp-typescript');
const sourcePath = './src/**/*.ts';

const watch = () => {
  build();
  return gulp.watch(sourcePath, build);
}

const build = () => {
  return gulp.src(sourcePath)
    .pipe(gulpTypsceript())
    .pipe(gulp.dest('build'));
};

exports.default = build;
exports.watch = watch;
