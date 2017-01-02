const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const rollup = require('rollup')

const paths = {
  styles: {
    src: 'web/styles/**/*.scss',
    dist: 'web/dist',
    filename: 'styles.css',
  },
  scripts: {
    src: 'web/scripts/**/*.js',
    entry: 'web/scripts/main.js',
    dist: 'web/dist/scripts.js',
  }
}

gulp.task('build:styles', () =>
  gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat(paths.styles.filename))
    .pipe(gulp.dest(paths.styles.dist))
)

gulp.task('build:scripts', () =>
  rollup.rollup({ entry: paths.scripts.entry })
    .then(bundle => bundle.write({
      dest: paths.scripts.dist,
      format: 'iife',
      sourceMap: true,
    }))
)

gulp.task('build', ['build:scripts', 'build:styles'])

gulp.task('watch', ['build'], () => {
  gulp.watch(paths.styles.src, ['build:styles'])
  gulp.watch(paths.scripts.src, ['build:scripts'])
})

gulp.task('default', ['watch'])
