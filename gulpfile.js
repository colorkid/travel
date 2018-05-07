const gulp = require('gulp');
	  pug  = require('gulp-pug');
	  sass = require('gulp-sass');
	  csso = require('gulp-csso');

gulp.task('pug', function () {
	return gulp.src('src/pug/pages/*.pug')
	.pipe(pug({
		pretty:true
  	}))
  	.pipe(gulp.dest('build'))
});

gulp.task('sass', function () {
	return gulp.src('src/scss/main.scss')
	.pipe(sass({}))
	.pipe(csso())
  	.pipe(gulp.dest('build'))
});
