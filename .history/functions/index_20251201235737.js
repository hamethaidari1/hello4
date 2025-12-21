const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure Nodemailer Transport
// IMPORTANT: Replace with your actual Gmail and App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hamedhaidari2023@gmail.com',
    pass: 'YOUR_APP_PASSWORD' 
  }
});

/**
 * Cloud Function: suspiciousLoginAlert
 * Triggers when a new document is created in the 'loginLogs' collection.
 * Sends a security alert email to the user.
 */
const suspiciousLoginAlert = functions.firestore
  .document('loginLogs/{docId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const email = data.email;

    if (!email) {
      console.log('No email found in log data.');
      return null;
    }

    console.log(`Processing security alert for: ${email}`);

    const mailOptions = {
      from: '"Job Portal Security" <noreply@jobportal.com>',
      to: email,
      subject: 'Security Alert: New Login Detected',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; border: 1px solid #ddd; border-radius: 8px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d32f2f; border-bottom: 2px solid #d32f2f; padding-bottom: 10px;">New Login Detected</h2>
          <p>Hello,</p>
          <p>We noticed a new login to your account. If this was you, you can ignore this email.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>🕒 Time:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
            <p><strong>🌐 IP Address:</strong> ${data.ip}</p>
            <p><strong>💻 Device:</strong> ${data.userAgent}</p>
            <p><strong>📍 Location:</strong> ${data.location || 'Unknown'}</p>
          </div>

          <p style="background-color: #ffebee; color: #c62828; padding: 10px; border-radius: 4px; text-align: center; font-weight: bold;">
            ⚠️ If you did not sign in, please change your password immediately.
          </p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Security alert sent to ${email}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }

    return null;
  });

module.exports = {
  suspiciousLoginAlert
};
