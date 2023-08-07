export default () => ({
  url: process.env.APP_URL || 'http://localhost',
  port: parseInt(process.env.APP_PORT),
  env: process.env.APP_ENV || 'production',
  debug: process.env.APP_DEBUG || false,
  logLever: process.env.APP_DEBUG == 'true' ? ['error'] : false, //  'log' | 'error' | 'warn' | 'debug' | 'verbose',
  timezone: 'UTC',
  locale: 'en',
  fallbackLocale: 'en',
  key: process.env.APP_KEY,
  cipher: 'AES-256-CBC',
  prefix: process.env.APP_PREFIX || '/',
});
