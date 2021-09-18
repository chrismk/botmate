import dotenv from 'dotenv'
import { cleanEnv, port, str, num } from 'envalid'

dotenv.config()

export default cleanEnv(process.env, {
	PORT: port({ default: 5337 }),
	NODE_ENV: str({ default: 'development' }),
	DB_TYPE: str({ default: 'mongodb' }),
	DB_HOST: str({ default: 'localhost' }),
	DB_PORT: num({ default: 27017 }),
	DB_USER: str({ default: '' }),
	DB_PASS: str({ default: '' }),
})
