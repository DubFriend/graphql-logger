const { argv } = require('yargs');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const babel = require('gulp-babel');

gulp.task(
  'transpile',
  () => gulp.src('src/**/*.js')
  .pipe(babel({
    presets: ['flow', 'es2015']
  }))
  .pipe(gulp.dest('lib'))
);

gulp.task('test', ['transpile'], () => gulp.src([
    'lib/**/*.unit.js',
    'lib/**/*.e2e.js'
  ])
  .pipe(mocha({
    reporter: 'dot',
    timeout: 500,
    grep: argv.grep,
  }))
  .once('error', err => {
    console.error(err.stack);
    process.exit(1);
  })
  .once('end', () => {
    process.exit();
  })
);
