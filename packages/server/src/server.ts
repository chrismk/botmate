import express from 'express'
import cors from 'cors'
import http from 'http'

const app = express()
const server = http.createServer(app)

app.use(cors())

export default server
