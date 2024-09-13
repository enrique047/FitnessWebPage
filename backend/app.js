import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { sendEmail } from './utils/sendEmail.js';

const app = express();
const router = express.Router();

config({ path: './config.env' });

// Middleware
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['POST'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
router.post('/send/mail', async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !message || !email) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all details',
        });
    }

    try {
        await sendEmail({
            email: '',
            subject: 'GYM WEBSITE CONTACT',
            message,
            userEmail: email,
        });

        res.status(200).json({
            success: true,
            message: 'Message sent successfully',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

// Use Router
app.use(router);

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}`);
});
