import dotenv from 'dotenv'
import { cleanEnv, port, str, num, bool } from 'envalid'

dotenv.config()

export default cleanEnv(process.env, {
	PORT: port({ default: 5337 }),
	NODE_ENV: str({ default: 'production' }),
	DB_TYPE: str({ default: 'postgres' }),
	DB_URL: str({ default: 'mongodb://localhost/botmate' }),
	SSL: bool({ default: false }),
})
