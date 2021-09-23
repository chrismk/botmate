const gulp = require('gulp')
const run = require('gulp-run')

function buildClient(cb) {
	run('yarn build:client').exec('', () => {
		cb()
	})
}

function buildServer(cb) {
	run('yarn build:server').exec('', () => {
		cb()
	})
}

function dist(cb) {
	gulp
		.src('packages/client/build/**')
		.pipe(gulp.dest('packages/server/dist/bm-client'))

	gulp.src('README.md').pipe(gulp.dest('packages/server/dist/'))

	cb()
}

exports.default = gulp.series(buildClient, buildServer, dist)
exports.dist = dist
exports.server = buildServer
exports.client = buildClient
