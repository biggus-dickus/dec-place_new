'use strict';

/**
 * Components and links
 */
var gulp = require('gulp'),
  less = require('gulp-less'),
  watch = require('gulp-watch'),
  autoprefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  // sourcemaps = require('gulp-sourcemaps'),
  rename = require('gulp-rename'),
  rigger = require('gulp-rigger'),
  cmq = require('gulp-combine-mq'),
  cssnano = require('gulp-cssnano'),
  spritesmith = require('gulp.spritesmith'),
  buffer = require('vinyl-buffer'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  rimraf = require('rimraf'),
  browserSync = require("browser-sync"),
  reload = browserSync.reload;

var path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    sprite: 'build/img/sprite/',
    fonts: 'build/fonts/'
  },
  src: {
    html: 'src/*.html',
    js: 'src/js/main.js',
    styles: 'src/styles/main.less',
    img: 'src/img/**/*.*',
    sprite: 'src/img/sprite/input/*.png',
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    styles: 'src/styles/**/*.less',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  clean: './build'
};

var config = {
  server: {
      baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: "bratishka"
};


/**
 * Gulp tasks
 */
gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
});

gulp.task('css:build', function () {
  gulp.src(path.src.styles)
    // .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
      }))
    .pipe(cmq())
    .pipe(cssnano())
    // .pipe(sourcemaps.write(path.build.css + '/sourcemaps'))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
  gulp.src(path.src.js)
    .pipe(rigger())
    // .pipe(sourcemaps.init())
    .pipe(uglify())
    // .pipe(sourcemaps.write(path.build.css + '/sourcemaps'))
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

gulp.task('img:build', function () {
  gulp.src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});

gulp.task('sprite:build', function () {
  var spriteData = gulp.src(path.src.sprite).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));

  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    .pipe(buffer())
    .pipe(imagemin({
      optimizationLevel: 3,
      use: [pngquant()]
    }))
    .pipe(gulp.dest(path.build.sprite));

    // Pipe CSS stream through CSS optimizer (if needed) and onto disk
  var cssStream = spriteData.css
    .pipe(gulp.dest(path.build.sprite));

  return;
});

gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
  'html:build',
  'css:build',
  'js:build',
  'fonts:build',
  'img:build'
]);

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('watch', function() {
  watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.styles], function(event, cb) {
    gulp.start('css:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start('img:build');
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:build');
  });
});

gulp.task('default', ['build', 'webserver', 'watch']);
