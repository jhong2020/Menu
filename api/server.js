import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from './models/User.js';
import menuRoutes from './routes/menuRoutes.js';
import authRoutes from './routes/authRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.MONGO;

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected!');
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected!');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use('/api/menu', menuRoutes);

// 회원가입 라우트
app.post('/api/auth/register', async (req, res) => {
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

// 사용자명 중복 확인 라우트
app.post('/api/auth/check-username', async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (user) {
      return res.status(400).json({ available: false, message: '이미 사용 중인 사용자명입니다.' });
  }
  res.status(200).json({ available: true, message: '사용 가능한 사용자명입니다.' });
});

// 이메일 중복 확인 라우트
app.post('/api/auth/check-email', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
      return res.status(400).json({ available: false, message: '이미 사용 중인 이메일입니다.' });
  }
  res.status(200).json({ available: true, message: '사용 가능한 이메일입니다.' });
});

// 로그인 라우트
app.post('/api/auth/login', async (req, res) => {
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
    
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 사용자 정보 가져오기 라우트
app.get('/api/auth/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 로그인 상태 확인 라우트
app.get('/api/auth/check', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ loggedIn: false });
  }
  jwt.verify(token, process.env.JWT, (err, decoded) => {
    if (err) {
      return res.json({ loggedIn: false });
    }
    return res.json({ loggedIn: true, user: decoded });
  });
});

// 사용자 프로필 업데이트 라우트
app.put('/api/auth/update-profile', async (req, res) => {
  try {
      const { userId, name, phone, email, introduction, password } = req.body;
      const updateData = { name, phone, email, introduction };

      if (password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          updateData.password = hashedPassword;
      }

      const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
      res.status(200).json(updatedUser);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// 로그아웃 라우트
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // 모든 도메인에서 접근 가능하게 설정
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
