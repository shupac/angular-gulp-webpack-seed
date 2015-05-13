var gulp      = require('gulp'),
    webpack   = require('gulp-webpack'),
    _         = require('lodash'),
    run       = require('run-sequence'),
    sync      = require('browser-sync'),
    reload    = function(opts){ sync.reload(opts) };


var root = 'src';
// all the paths to our code
var paths = {
  js: root + '/app/**/*.js',
  styl: root + '/app/**/*.styl',
  templates: root + '/app/**/*.html',
  index: root + '/index.html',
  entry: root + '/app/app.js'
};

gulp.task('serve', function(){
  sync({
    port: 9000,
    open: false,
    server: {
      baseDir: root
    }
  });
});

gulp.task('webpack', function(){
  return gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(root));
});

gulp.task('watch', function(){

  var files = _.cloneDeep(paths);

  var webpackPaths = [].concat(
    files.js,
    files.templates,
    files.styl,
    files.index
  );

  gulp.watch(webpackPaths, ['webpack', reload]);
});

gulp.task('default', function(done){
  run('webpack', 'serve', 'watch', done);
});
