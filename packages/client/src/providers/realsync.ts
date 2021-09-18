import { RealSync } from '@realsync/react'

const HOST = process.env.REACT_APP_HOST || 'http://localhost:5337'
const realsync = new RealSync(HOST)

export default realsync
