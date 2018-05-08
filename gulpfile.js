const gulp = require('gulp');
	  pug  = require('gulp-pug');
	  sass = require('gulp-sass');
	  csso = require('gulp-csso');
	  autoprefixer = require('gulp-autoprefixer');
	  sourcemaps = require('gulp-sourcemaps');
	  notify = require("gulp-notify");
	  browserSync = require('browser-sync').create();

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        },
        browser: 'chrome'
    });
});

gulp.task('pug', function () {
	return gulp.src('src/pug/pages/*.pug')
	.pipe(pug({
		pretty:true
  	}))
  	.pipe(gulp.dest('build'))
  	.on('end',browserSync.reload);
});

gulp.task('sass', function () {
	return gulp.src('src/scss/main.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({}))
	.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
    }))
    .on("error", notify.onError({
        message: "Error: <%= error.message %>",
        title: "Error running something"
    }))
	.pipe(csso())
	.pipe(sourcemaps.write())
  	.pipe(gulp.dest('build'))
  	.pipe(browserSync.reload({
  		stream:true
  	}));
});

gulp.task('watch', function () {
	gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
	gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series(
	gulp.parallel('pug', 'sass'),
	gulp.parallel('watch', 'serve')
	));