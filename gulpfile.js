const gulp = require('gulp')
const pug = require('gulp-pug')
const ts = require('gulp-typescript')
const webpack = require('webpack')
const path = require('path')

const tsProject = ts.createProject('tsconfig.json')

const webpackConfig = {
  entry: path.resolve(__dirname, 'src/web/main.js'),
  output: {
    path: path.resolve(__dirname, 'build/web'),
    filename: 'main.js',
    publicPath: '/build/web/',
  },
  module: {
    rules: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.vue$/, loader: 'vue-loader' },
    ]
  }
}

gulp.task('build:server', () =>
  gulp.src('src/server/**/*.ts')
    .pipe(tsProject())
    .pipe(gulp.dest('build/server'))
)

gulp.task('build:web:pug', () =>
  gulp.src('src/web/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('build/web'))
)

gulp.task('build:web:webpack', done => webpack(webpackConfig, done))

gulp.task('build:web', ['build:web:pug', 'build:web:webpack'])

gulp.task('build', ['build:server', 'build:web'])

gulp.task('default', ['build'])
