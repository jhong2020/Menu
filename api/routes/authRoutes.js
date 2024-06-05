import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

// 회원가입 라우트
router.post('/register', async (req, res) => {
    try {
        const { name, username, password, email, phone, introduction } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, username, password: hashedPassword, email, phone, introduction });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 로그인 라우트
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        res.json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 사용자명 중복 확인 라우트
router.post('/check-username', async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        return res.status(400).json({ message: '이미 사용 중인 사용자명입니다.' });
    }
    res.status(200).json({ message: '사용 가능한 사용자명입니다.' });
});

// 이메일 중복 확인 라우트
router.post('/check-email', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: '이미 사용 중인 이메일입니다.' });
    }
    res.status(200).json({ message: '사용 가능한 이메일입니다.' });
});

export default router;
