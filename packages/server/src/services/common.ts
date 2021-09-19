const { version } = require('../../package.json')
const toMB = (bytes: number) =>
	`${Math.round((bytes / 1024 / 1024) * 100) / 100} MB`

const common = () => {
	const { heapUsed } = process.memoryUsage()
	const ramUsage = toMB(heapUsed)

	return {
		version,
		ramUsage,
	}
}

export { common }
