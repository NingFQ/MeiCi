var gulp = require('gulp');
var sass = require('gulp-sass');
//首页
gulp.task('index',function(){
    return gulp.src('scss/index.scss')
        .pipe(sass({style:'expanded'}))
        .pipe(gulp.dest('css'));
});
gulp.task('watch1',function(){
    gulp.watch('scss/index.scss',['index']);
});
//登录页
gulp.task('login',function(){
    return gulp.src('scss/login.scss')
        .pipe(sass({style:'expanded'}))
        .pipe(gulp.dest('css'));
});
gulp.task('watch2',function(){
    gulp.watch('scss/login.scss',['login']);
});
//注册页
gulp.task('register',function(){
    return gulp.src('scss/register.scss')
        .pipe(sass({style:'expanded'}))
        .pipe(gulp.dest('css'));
});
gulp.task('watch3',function(){
    gulp.watch('scss/register.scss',['register']);
});
//商品列表页
gulp.task('list',function(){
    return gulp.src('scss/list.scss')
        .pipe(sass({style:'expanded'}))
        .pipe(gulp.dest('css'));
});
gulp.task('watch4',function(){
    gulp.watch('scss/list.scss',['list']);
});
//详情页
gulp.task('details',function(){
    return gulp.src('scss/details.scss')
        .pipe(sass({style:'expanded'}))
        .pipe(gulp.dest('css'));
});
gulp.task('watch5',function(){
    gulp.watch('scss/details.scss',['details']);
});
//购物车页
gulp.task('shopcar',function(){
    return gulp.src('scss/shopcar.scss')
        .pipe(sass({style:'expanded'}))
        .pipe(gulp.dest('css'));
});
gulp.task('watch6',function(){
    gulp.watch('scss/shopcar.scss',['shopcar']);
});