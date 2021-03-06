const { series, parallel } = require('gulp'),
  del = require('del'),
  dotenv = require('dotenv'),
  lalalia = require('../index')
let path = process.env.APP_ENV ? '.env.' + process.env.APP_ENV : '.env'
const configs = lalalia.getConfigs()

console.log(`CONFIG: ${path}`)
dotenv.config({ path })

function clean() {
  return Promise.resolve(del([
    configs.paths.tmp.root,
    configs.paths.root + '/rev',
    configs.paths.dest.root
  ], { force: true }))
}

function clean_build() {
  return Promise.resolve(del([
    configs.paths.tmp.root,
    configs.paths.root + '/rev',
    configs.paths.src.css,
    configs.paths.src.js,
  ], { force: true }))
}
function start() {
  return Promise.resolve(lalalia(configs))
}

function build() {
  return Promise.resolve(lalalia(configs, {
    minify: true,
    serve: false,
    hash: true,
    sitemap: {
      siteUrl: 'http://example.com/'
    }
  }))
}

exports.clean = clean
exports.clean_build = clean_build
exports.build = series(clean, build)
exports.default = series(clean, start)

