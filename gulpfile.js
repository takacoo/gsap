// パターン２
import gulp from 'gulp';
import ftp from 'vinyl-ftp';
import fs from 'fs';
import webp from 'gulp-webp';
import plumber from 'gulp-plumber';
import sassGlob from 'gulp-sass-glob';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import gulpBabel from 'gulp-babel';
import uglify from 'gulp-uglify';
import path from 'path';
import rename from 'gulp-rename';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { src, dest, watch, series } = gulp;
const sass = gulpSass(dartSass);

const loadJsonSync = function (filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
};
const ftpConfig = loadJsonSync(__dirname + '/ftpconfig.json');

const connect = ftp.create(ftpConfig);

const ftpUploadFiles = [
  './**.html',
];
const ftpUploadFilesCss = [
  './assets/css/*.css',
];
const ftpUploadFilesJs = [
  './assets/js/*.js',
];
const ftpUploadFilesImgCommon = [
  './assets/dist/_common/**/*',
];
const ftpUploadFilesImgFront = [
  './assets/dist/front/**/*',
];

// アップロードしたいサーバーのディレクトリを入力
const remoteDistDir = 'ptotst-navi.work/public_html/takaishi/';
const remoteDistDirCss = remoteDistDir + 'assets/css';
const remoteDistDirJs = remoteDistDir + 'assets/js';
const remoteDistDirImgCommon = remoteDistDir + 'assets/dist/_common';
const remoteDistDirImgFront = remoteDistDir + 'assets/dist/front';

// FTPアップロード機能
const vinylFtp = () => {
  return src(ftpUploadFiles, { buffer: false })
    .pipe(connect.newer(remoteDistDir))
    .pipe(connect.dest(remoteDistDir));
};
const vinylFtpCss = () => {
  return src(ftpUploadFilesCss, { buffer: false })
    .pipe(connect.newer(remoteDistDirCss))
    .pipe(connect.dest(remoteDistDirCss));
};
const vinylFtpJs = () => {
  return src(ftpUploadFilesJs, { buffer: false })
    .pipe(connect.newer(remoteDistDirJs))
    .pipe(connect.dest(remoteDistDirJs));
};
const vinylFtpImgCommon = () => {
  return src(ftpUploadFilesImgCommon, { buffer: false })
    .pipe(connect.newer(remoteDistDirImgCommon))
    .pipe(connect.dest(remoteDistDirImgCommon));
};
const vinylFtpImgFront = () => {
  return src(ftpUploadFilesImgFront, { buffer: false })
    .pipe(connect.newer(remoteDistDirImgFront))
    .pipe(connect.dest(remoteDistDirImgFront));
};

const styles = () => {
  return src("assets/scss/*.scss")
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer())
    .pipe(dest("assets/css/"))
};

export const image = () => {
  return src("assets/img/**/*")
    .pipe(webp())
    .pipe(dest("assets/dist/"))
};

const jsMinify = () => {
  return src("assets/js/init.js")
    .pipe(gulpBabel({
      presets: ['@babel/preset-env']
    }))
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest("assets/js/"))
};

const watchFile = () => {
  watch("assets/scss/**/*.scss", styles);
  watch("assets/img/**/*.{jpg,jpeg,png,svg,gif}", image);
  watch("assets/js/init.js", jsMinify);
  watch(ftpUploadFiles, vinylFtp);
  watch(ftpUploadFilesCss, vinylFtpCss);
  watch(ftpUploadFilesJs, vinylFtpJs);
  watch(ftpUploadFilesImgCommon, vinylFtpImgCommon);
  watch(ftpUploadFilesImgFront, vinylFtpImgFront);
};

export default series(watchFile)