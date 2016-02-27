var gulp = require('gulp'),
	wiredep = require('wiredep').stream,
	connect = require('gulp-connect'),
	compass = require( 'gulp-for-compass' ),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	clean = require('gulp-clean'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	autoprefixer = require('gulp-autoprefixer'),
	uncss = require('gulp-uncss'),
	concatCss = require('gulp-concat-css');

/* wiredep */

gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      directory: "app/bower_components"
    }))
    .pipe(gulp.dest('./app'));
});

/* wiredep end */

/* build */

gulp.task('clean', function () {
	return gulp.src('dist', {read: false})
		.pipe(clean());
});

gulp.task('build', ['clean'], function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', autoprefixer({
			browsers: ['last 30 versions'],
			cascade: false
		})))
        .pipe(gulpif('', uncss({
        	csspath: ['app/css/*.css'],
            ignoreSheets: ['app/css/test.css']
        })))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});

// gulp.task('css', function () {
// 	return gulp.src('app/css/nouncss/*.css')
// 	.pipe(concatCss("slick.css"))
// 	.pipe(gulpif('*.css', autoprefixer({
// 			browsers: ['last 30 versions'],
// 			cascade: false
// 		})))
// 	.pipe(gulpif('*.css', minifyCss()))
// 	.pipe(gulp.dest('dist/css/'));
// });

/* end build */

/* image-min */

gulp.task('images', () => {
	return gulp.src('app/images/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/images'));
});

/* end image-min */

/* gulp-conect*/

gulp.task('connect', function() {
  connect.server({
    root: 'C:/wamp/www/splat/www/app',
    livereload: true
  });
});

/* end gulp-conect*/

/* gulp-for-compass */

gulp.task('compass', function() {
    gulp.src('./app/sass/*.scss')
    .pipe(compass({
        sassDir: './app/sass',
        cssDir: './app/css',
        force: true,
        fontsDir: 'app'
    }))
   	.pipe(connect.reload());
});

/* end gulp-for-compass */

/* HTML */

gulp.task('html', function() {
	return gulp.src('./app/index.html')
	.pipe(connect.reload());
});

/* end HTML */

/* Fonts */

gulp.task('fonts', function() {
	return gulp.src('./app/fonts/*')
	.pipe(gulp.dest('dist/fonts'));
});

/* end Fonts */

gulp.task('watch', function () {
	gulp.watch('bower.json', ['bower']); //wiredep
	gulp.watch(['./app/sass/*.scss'], ['compass']);
	gulp.watch(['./app/index.html'], ['html']);
});




gulp.task('default', ['connect', 'compass', 'html', 'watch']);
gulp.task('dis', ['images', 'fonts', 'build']);
