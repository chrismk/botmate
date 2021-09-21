import { RealSync } from '@realsync/react'

const HOST =
	process.env.REACT_APP_HOST || process.env.NODE_ENV === 'development'
		? 'http://10.0.0.18:5337'
		: window.location.host
const realsync = new RealSync(HOST)

export default realsync
