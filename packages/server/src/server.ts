import path from 'path'
import express from 'express'
import cors from 'cors'
import http from 'http'
import env from './env'

const app = express()
const server = http.createServer(app)

const clientDir = path.join(__dirname, 'bm-client')
app.use(express.static(clientDir))

app.get('*', (req, res) => {
	if (env.NODE_ENV === 'development') {
		res.end('DEVELOPMENT')
		return
	}
	res.sendFile(clientDir + '/index.html')
})

app.use(cors())

export default server
