const required = [
  'DATABASE_URL',
  'OPENAI_API_KEY',
  'ADMIN_SECRET',
  'SMTP_USER',
  'SMTP_APP_PASSWORD',
  'NOTIFICATION_EMAIL',
];

const optional = [
  'CAL_COM_API_KEY',
  'CAL_COM_EVENT_TYPE_ID',
  'ALLOWED_ORIGINS',
  'NODE_ENV',
  'PORT',
];

export function validateEnv() {
  const missing = [];
  const warnings = [];

  required.forEach((key) => {
    if (!process.env[key]) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map((k) => `  - ${k}`).join('\n')}\n\nPlease check your .env file.`
    );
  }

  if (!process.env.CAL_COM_API_KEY) {
    warnings.push('CAL_COM_API_KEY not set - booking functionality will be limited');
  }

  if (!process.env.ALLOWED_ORIGINS && process.env.NODE_ENV === 'production') {
    warnings.push('ALLOWED_ORIGINS not set - CORS will allow all origins (security risk)');
  }

  if (process.env.ADMIN_SECRET && process.env.ADMIN_SECRET.length < 20) {
    warnings.push('ADMIN_SECRET should be at least 20 characters for security');
  }

  if (warnings.length > 0) {
    console.warn('⚠️  Environment warnings:');
    warnings.forEach((warning) => console.warn(`   ${warning}`));
  }

  console.log('✅ Environment variables validated');
}
