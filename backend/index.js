const functions = require('@google-cloud/functions-framework');
const nodemailer = require('nodemailer');

// Define allowed origins
const allowedOrigins = [
  'https://nigelcheong.com',
  'https://www.nigelcheong.com',
  'https://nigel-cheong.github.io'
];

const cors = require('cors')({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
});

functions.http('sendEmail', (req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send({ error: 'Method Not Allowed' });
    }

    const { fullname, email, message, recaptchaToken } = req.body;

    if (!fullname || !email || !message || !recaptchaToken) {
      return res.status(400).send({ error: 'Missing required fields or reCAPTCHA token' });
    }

    try {
      // 1. Verify reCAPTCHA token
      const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
      if (recaptchaSecret) {
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`;
        const recaptchaResponse = await fetch(verifyUrl, { method: 'POST' });
        const recaptchaData = await recaptchaResponse.json();

        // Check if successful and if the score is high enough (0.5 is a common threshold for v3)
        if (!recaptchaData.success || recaptchaData.score < 0.5) {
          console.warn('reCAPTCHA verification failed or score too low:', recaptchaData);
          return res.status(403).send({ error: 'Failed security verification. Are you a bot?' });
        }
      } else {
         console.warn('RECAPTCHA_SECRET_KEY not set. Skipping verification (Not recommended in production).');
      }

      const textContent = `Name: ${fullname}\nEmail: ${email}\n\nMessage:\n${message}`;

      // 2. Send Email Notification
      if (process.env.SMTP_USER && process.env.SMTP_PASS && process.env.RECEIVER_EMAIL) {
        const transporter = nodemailer.createTransport({
          service: process.env.SMTP_SERVICE || 'gmail',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const mailOptions = {
          from: `"${fullname}" <${email}>`,
          to: process.env.RECEIVER_EMAIL,
          subject: `New Portfolio Message from ${fullname}`,
          text: textContent,
          replyTo: email,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      }

      // 3. Send Telegram Notification
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      if (botToken && chatId) {
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        await fetch(telegramUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: `🚨 *New Portfolio Message!*\n\n*From:* ${fullname}\n*Email:* ${email}\n\n*Message:*\n${message}`,
            parse_mode: 'Markdown'
          })
        });
        console.log('Telegram notification sent successfully');
      }

      res.status(200).send({ success: true, message: 'Message processed successfully' });
    } catch (error) {
      console.error('Error processing message:', error);
      res.status(500).send({ error: 'Failed to process message' });
    }
  });
});
