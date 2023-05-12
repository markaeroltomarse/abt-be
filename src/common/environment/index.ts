import * as dotenv from 'dotenv';
dotenv.config();

const APP_PORT = +process.env.APP_PORT || 3000;
const APP_ENV = process.env.APP_ENV || '';
const APP_VERSION = process.env.APP_VERSION || '0.0.1';

const CORS_ALLOWED_HEADERS =
  process.env.CORS_ALLOWED_HEADERS ||
  'Access-Control-Allow-Headers,Origin,X-Requested-With,Content-Type,Accept,Authorization';
const CORS_EXPOSED_HEADERS = process.env.CORS_EXPOSED_HEADERS || '';
const CORS_WHITELIST = process.env.CORS_WHITELIST || '';
const JWT_SECRET = process.env.JWT_SECRET || '';
export {
  APP_PORT,
  APP_ENV,
  APP_VERSION,
  CORS_ALLOWED_HEADERS,
  CORS_EXPOSED_HEADERS,
  CORS_WHITELIST,
  JWT_SECRET,
};
