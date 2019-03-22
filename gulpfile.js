const pkg = require('./package.json');
const gulp = require('gulp');
const gulpTypsceript = rqeuire('gulp-typescript');
const sourcePath = './src/**/*.ts';

const watch = () => {
  gulp.watch(sourcePath, build);
}

const build = () => {
  gulp.src(sourcePath)
    .pipe(gulpTypsceript)
    .pipe(gulp.dest(pkg.main));
};

module.exports = exports = build;
exports.watch = watch;
