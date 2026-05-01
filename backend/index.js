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
    // Allow requests with no origin (like mobile apps or curl requests) 
    // OR if the origin is in our allowed list
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
});

functions.http('sendEmail', (req, res) => {
  // Handle CORS
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send({ error: 'Method Not Allowed' });
    }

    const { fullname, email, message } = req.body;

    if (!fullname || !email || !message) {
      return res.status(400).send({ error: 'Missing required fields' });
    }

    const textContent = `Name: ${fullname}\nEmail: ${email}\n\nMessage:\n${message}`;

    try {
      // 1. Send Email Notification (if configured)
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
      } else {
        console.log('Skipping email notification (SMTP credentials not fully configured).');
      }

      // 2. Send Telegram Notification (if configured)
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      if (botToken && chatId) {
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const telegramResponse = await fetch(telegramUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: `🚨 *New Portfolio Message!*\n\n*From:* ${fullname}\n*Email:* ${email}\n\n*Message:*\n${message}`,
            parse_mode: 'Markdown'
          })
        });

        if (!telegramResponse.ok) {
           console.error('Failed to send Telegram message:', await telegramResponse.text());
        } else {
           console.log('Telegram notification sent successfully');
        }
      } else {
        console.log('Skipping Telegram notification (Token/Chat ID not configured).');
      }

      res.status(200).send({ success: true, message: 'Message processed successfully' });
    } catch (error) {
      console.error('Error processing message:', error);
      res.status(500).send({ error: 'Failed to process message' });
    }
  });
});
