const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.resolve(__dirname, './.env') })

let envPath

// validate the NODE_ENV
const NODE_ENV = process.env.NODE_ENV
switch (NODE_ENV) {
  case 'development':
    envPath = path.resolve(__dirname, './.env.development')
    break
  case 'staging':
    envPath = path.resolve(__dirname, './.env.staging')
    break
  case 'production':
    envPath = path.resolve(__dirname, './.env.production')
    break
  default:
    envPath = path.resolve(__dirname, './.env.local')
    break
};

dotenv.config({ path: envPath })

const enviroment = {
  /* GENERAL */
  NODE_ENV,
  APP_PORT: process.env.APP_PORT,
  /* DATABASE INFORMATION */
  DB_CLIENT: process.env.DB_CLIENT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_FILE_RELATIVE_PATH: process.env.DB_FILE_RELATIVE_PATH,
  /* GCP */
  GCP_TYPE: process.env.GCP_TYPE,
  GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
  GCP_PRIVATE_KEY_ID: process.env.GCP_PRIVATE_KEY_ID,
  GCP_PRIVATE_KEY: process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
  GCP_CLIENT_EMAIL: process.env.GCP_CLIENT_EMAIL,
  GCP_CLIENT_ID: process.env.GCP_CLIENT_ID,
  GCP_AUTH_URI: process.env.GCP_AUTH_URI,
  GCP_TOKEN_URI: process.env.GCP_TOKEN_URI,
  GCP_AUTH_PROVIDER_X509_CERT_URL: process.env.GCP_AUTH_PROVIDER_X509_CERT_URL,
  GCP_CLIENT_X509_CERT_URL: process.env.GCP_CLIENT_X509_CERT_URL,
  GCP_BUCKET_NAME: process.env.GCP_BUCKET_NAME,
  /* FIREBASE */
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
  FIREBASE_DB_URL: process.env.FIREBASE_DB_URL,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
  /* GOOGLE MAPS */
  GOOGLE_MAPS_BASE_URL: process.env.GOOGLE_MAPS_BASE_URL,
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  GOOGLE_MAPS_PLACE_AUTOCOMPLETE_RADIUS: process.env.GOOGLE_MAPS_PLACE_AUTOCOMPLETE_RADIUS
}

module.exports = enviroment
