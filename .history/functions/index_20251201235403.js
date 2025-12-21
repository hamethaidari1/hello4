const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// استفاده از متغیرهای محیطی Firebase
const mailUser = functions.config().gmail.user;
const mailPass = functions.config().gmail.pass;

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mailUser,
    pass: mailPass,
  },
});

// Cloud Function → ارسال ایمیل هنگام لاگین مشکوک
exports.suspiciousLoginAlert = functions.firestore
  .document("alerts/{userId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();

    const mailOptions = {
      from: mailUser,
      to: data.email,
      subject: "⚠️ هشدار امنیتی: ورود مشکوک شناسایی شد",
      html: `
        <h2>ورود مشکوک به حساب شما تشخیص داده شد</h2>
        <p><strong>IP:</strong> ${data.ip}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Time:</strong> ${data.time}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return null;
  });
