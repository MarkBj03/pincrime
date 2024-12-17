const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());

// Dummy database for demonstration
let users = [
    { email: 'user@example.com', password: '123456', isVerified: false, otp: '123456' }
];

// POST route for login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    if (!user.isVerified) {
        return res.status(403).json({ success: false, message: 'Email not verified. Please verify your email.', email });
    }

    // Generate a token for authenticated users
    const token = jwt.sign({ email: user.email }, 'secretkey', { expiresIn: '1h' });
    return res.status(200).json({ success: true, token });
});

// POST route for verifying OTP
app.post('/api/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    const user = users.find((u) => u.email === email);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (user.otp !== otp) {
        return res.status(400).json({ success: false, message: 'Invalid OTP.' });
    }

    user.isVerified = true;
    return res.status(200).json({ success: true, message: 'Email verified successfully.' });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
