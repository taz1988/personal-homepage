const gulp          = require('gulp');
const dotenv          = require('dotenv');
const webpack       = require('webpack');
const del           = require('del');
const s3            = require('gulp-s3-upload')();
const jest          = require('gulp-jest').default;
const webpackConfig = require('./webpack.config.js');
const webpackConfigProd = require('./webpack.production.config.js');
let actualWebpackConfig = webpackConfig;

const targetMainPath = "build/";


function clean() {
  return del([targetMainPath + '**']);
};

function releaseToBucket()
{
  return gulp.src("./build/*.html")
  .pipe(s3({
    Bucket: 'personal-homepage'
  }));
}

function executeTests() {
  return gulp.src('src/tests/**.test.js').pipe(jest());
};

function concanetateBlogEntries()
{
    //TODO implement it
}

function executeWebpack(cb)
{
      dotenv.config();
      webpack(actualWebpackConfig, (err, stats) => {
        console.log(err);
          if (err) {
              cb(err)
          }
          if (stats.hasErrors()) {
              cb(new Error(stats.compilation.errors.join('\n')))
          }
          cb()
      });
}

function buildPage()
{
    //TODO implement it and replace to use this instead of executeWebpack
}

function watch()
{
    gulp.watch("src/**", gulp.series(executeWebpack));
};

function initProdConfig(cb)
{
    actualWebpackConfig = webpackConfigProd;
    cb();
};


exports.webpack  = executeWebpack;
exports.release = gulp.series(clean, initProdConfig, executeWebpack, executeTests, releaseToBucket);
exports.executeTests = executeTests;
exports.develop = gulp.series(clean, executeWebpack, watch);
exports.default = gulp.series(clean, executeWebpack, executeTests);
