const gulp = require('gulp')
const ts = require('gulp-typescript')
const tsProject = ts.createProject('tsconfig.json')

gulp.task('build:server', () =>
  gulp.src('src/server/**/*.ts')
    .pipe(tsProject())
    .pipe(gulp.dest('build/server'))
)

gulp.task('build', ['build:server'])

gulp.task('default', ['build'])
