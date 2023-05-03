import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import rename from 'gulp-rename';
import svgo from 'gulp-svgmin';
import squoosh from 'gulp-libsquoosh';
import { deleteAsync } from 'del';
import svgstore from 'gulp-svgstore';

const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

const reload = (done) => {
  browser.reload();
  done();
}

const scripts = () => {
  return gulp.src('source/js/index.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'));
}

const optimizeImages = () => {
  return gulp.src('source/img/*.{jpg, jpeg, png}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'));
}

const copyImages = () => {
  return gulp.src(['source/img/**/*.**'])
    .pipe(gulp.dest('build/img'));
}

const createWebp = () => {
  return gulp.src('source/img/*.{jpg, jpeg, png}')
    .pipe(squoosh({ webp: {}}))
    .pipe(gulp.dest('build/img'))
}

const svg = () => {
  return gulp.src('source/img/svg/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('build/img/svg'));
}

const sprite = () => {
  return gulp.src('source/img/sprite/*.svg')
    .pipe(svgo())
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
}

const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/favicon.ico',
    'source/icon.svg',
    'source/apple-touch-icon.png',
    'source/icon-192.png',
    'source/icon-512.png',
    'source/manifest.webmanifest'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
  done();
}

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

export const clean = () => {
  return deleteAsync('build');
}

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebp
  ),
);

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher,
  )
);
