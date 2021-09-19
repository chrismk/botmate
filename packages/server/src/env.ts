import dotenv from 'dotenv'
import { cleanEnv, port, str, num } from 'envalid'

dotenv.config()

export default cleanEnv(process.env, {
	PORT: port({ default: 5337 }),
	NODE_ENV: str({ default: 'development' }),
	DB_TYPE: str({ default: 'postgres' }),
	DB_URL: str({ default: 'postgresql://localhost/botmate' }),
})
