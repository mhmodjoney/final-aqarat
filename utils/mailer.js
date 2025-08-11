const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendOtpEmail({ to, otpCode }) {
  const html = `
  <div dir="rtl" style="background:#f7f7fb;padding:24px;font-family:Tahoma, Arial, sans-serif;color:#222;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width:560px;background:#ffffff;border-radius:12px;box-shadow:0 6px 18px rgba(0,0,0,0.06);overflow:hidden;">
      <tr>
        <td style="background:#4F46E5;padding:18px 24px;color:#fff;text-align:center;">
          <h1 style="margin:0;font-size:20px;">رمز التحقق من الحساب</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 24px 8px 24px;">
          <p style="margin:0 0 12px 0;font-size:15px;">مرحباً،</p>
          <p style="margin:0 0 16px 0;font-size:15px;line-height:1.8;">
            تم إنشاء رمز تحقق لتأكيد ملكيتك لهذا البريد الإلكتروني. الرجاء استخدام الرمز التالي لإتمام عملية التحقق:
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:0 24px 16px 24px;text-align:center;">
          <div style="display:inline-block;background:#F3F4F6;border:1px solid #E5E7EB;border-radius:10px;padding:16px 20px;">
            <div style="font-size:28px;letter-spacing:6px;font-weight:bold;color:#111827;">${otpCode}</div>
          </div>
          <p style="margin:12px 0 0 0;color:#6B7280;font-size:13px;">الرمز صالح لمدة 5 دقائق فقط.</p>
        </td>
      </tr>
      <tr>
        <td style="padding:0 24px 24px 24px;">
          <p style="margin:8px 0 0 0;font-size:13px;color:#6B7280;line-height:1.8;">
            إذا لم تطلب هذا الرمز، يمكنك تجاهل هذه الرسالة بأمان.
          </p>
        </td>
      </tr>
      <tr>
        <td style="background:#F9FAFB;padding:14px 24px;text-align:center;color:#6B7280;font-size:12px;">
          <div>© ${new Date().getFullYear()} Aqarat</div>
        </td>
      </tr>
    </table>
  </div>`;

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to,
    subject: 'رمز التحقق الخاص بك',
    text: `رمز التحقق الخاص بك هو: ${otpCode} (صالح لمدة 5 دقائق)`,
    html
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendOtpEmail };
