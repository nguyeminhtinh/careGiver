var gulp = require('gulp');
var sass = require('gulp-sass');
var cssbeautify = require('gulp-cssbeautify');

gulp.task('sass', function () {
	return gulp.src('./src/public/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cssbeautify())
		.pipe(gulp.dest('./src/public/css'));
});

gulp.task('watch', function () {
	gulp.watch('./src/public/scss/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series('sass', 'watch'));
