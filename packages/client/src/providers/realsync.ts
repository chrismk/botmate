import { RealSync } from '@realsync/react'

const HOST = process.env.REACT_APP_HOST || 'http://10.0.0.18:5337'
const realsync = new RealSync(HOST)

export default realsync
