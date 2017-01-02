const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')

const paths = {
  styles: {
    src: 'web/styles/**/*.scss',
    dist: 'web/dist',
    filename: 'styles.css',
  },
  scripts: {
    src: 'web/scripts/**/*.js',
    dist: 'web/dist',
    filename: 'scripts.js',
  }
}

gulp.task('build:styles', () =>
  gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat(paths.styles.filename))
    .pipe(gulp.dest(paths.styles.dist))
)

gulp.task('build:scripts', () =>
  gulp.src(paths.scripts.src)
    .pipe(concat(paths.scripts.filename))
    .pipe(gulp.dest(paths.scripts.dist))
)

gulp.task('build', ['build:scripts', 'build:styles'])

gulp.task('watch', ['build'], () => {
  gulp.watch(paths.styles.src, ['build:styles'])
  gulp.watch(paths.scripts.src, ['build:scripts'])
})

gulp.task('default', ['watch'])
