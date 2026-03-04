import dotenv from 'dotenv';
dotenv.config();

import { verifyConnection, sendLeadNotification } from './src/services/email.js';

console.log('🧪 Email Configuration Test\n');

console.log('Configuration:');
console.log(`  Provider: ${process.env.EMAIL_PROVIDER || 'gmail (default)'}`);
console.log(`  SMTP User: ${process.env.SMTP_USER}`);
console.log(`  Notification Email: ${process.env.NOTIFICATION_EMAIL}`);
console.log(`  Password Set: ${process.env.SMTP_APP_PASSWORD ? '✓' : '✗'}\n`);

console.log('Testing SMTP connection...');

verifyConnection()
  .then((success) => {
    if (success) {
      console.log('\n✅ SMTP connection successful!\n');
      console.log('Would you like to send a test email? (y/n)');
      console.log('Note: This will send a test lead notification to', process.env.NOTIFICATION_EMAIL);
      
      // For automated testing, we'll just verify the connection
      process.exit(0);
    } else {
      console.log('\n❌ SMTP connection failed!');
      console.log('\nTroubleshooting steps:');
      console.log('1. Check your EMAIL_PROVIDER setting (gmail, outlook, or office365)');
      console.log('2. Verify SMTP_USER is your full email address');
      console.log('3. Ensure SMTP_APP_PASSWORD is an app-specific password (not your regular password)');
      console.log('4. For Gmail: https://myaccount.google.com/apppasswords');
      console.log('5. For Outlook: https://account.microsoft.com/security');
      console.log('\nSee docs/EMAIL_SETUP.md for detailed instructions.\n');
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('\n❌ Error:', error.message);
    console.log('\nSee docs/EMAIL_SETUP.md for troubleshooting help.\n');
    process.exit(1);
  });
