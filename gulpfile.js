const gulp = require('gulp')
const sass = require('gulp-sass')
//
// function demoSass(done) {
//   return gulp.src('./demo/src/*.scss')
//   .pipe(sass())
//   .pipe(gulp.dest('./demo/dist/'))
//   .on('end', done)
// }

function srcCopy(done) {
  return gulp.src('./src/*')
  .pipe(gulp.dest('./dist/'))
  .on('end', done)
}

module.exports.watch = function() {
  gulp.watch(['./src/*'], srcCopy) // gulp.series(demoSass, demoCopy)
}

module.exports['src:copy'] = srcCopy // gulp.series(demoSass, demoCopy)
