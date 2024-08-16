import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

const RECAPTCHA_SECRET_V3 = 'YOUR_RECAPTCHA_V3_SECRET_KEY';
const RECAPTCHA_SECRET_V2 = 'YOUR_RECAPTCHA_V2_SECRET_KEY';

app.use(bodyParser.json());

app.post('/verify-recaptcha', async (req, res) => {
  const { token, version } = req.body;
  const secretKey = version === 'v3' ? RECAPTCHA_SECRET_V3 : RECAPTCHA_SECRET_V2;

  try {
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    res.status(500).json({ success: false, error: 'Failed to verify reCAPTCHA' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
