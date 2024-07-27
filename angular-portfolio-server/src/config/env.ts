import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface EnvConfig {
  PORT: number;
  MONGODB_URI: string;
  MONGOOSE_PASS: string;
  MONGOOSE_USER: string;
  DB_NAME: string;
}
const env: EnvConfig = {
  PORT: parseInt(process.env.PORT as string, 10) || 3000,
  MONGODB_URI: process.env.MONGODB_URI as string,
  MONGOOSE_PASS: process.env.MONGOOSE_PASS as string,
  MONGOOSE_USER: process.env.MONGOOSE_USER as string,
  DB_NAME: process.env.DB_NAME as string
};

export default env;