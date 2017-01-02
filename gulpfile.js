const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')

const paths = {
  styles: {
    src: 'web/styles/**/*.scss',
    dist: 'web',
  }
}

gulp.task('build:styles', () =>
  gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(paths.styles.dist))
)

gulp.task('watch:styles', ['build:styles'], () => {
  gulp.watch(paths.styles.src, ['build:styles'])
})


gulp.task('watch', ['watch:styles'])
gulp.task('build', ['build:styles'])

gulp.task('default', ['build'])
