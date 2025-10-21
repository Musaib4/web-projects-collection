import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './User.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ DB Error:', err));

// SIGN UP
app.post('/signup', async (req, res) => {
  const { fullName, username, email, password } = req.body;

  if (!fullName || !username || !email || !password)
    return res.status(400).json({ success: false, message: 'All fields are required' });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return res.status(400).json({ success: false, message: 'Invalid email format' });

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password))
    return res.status(400).json({ success: false, message: 'Password too weak' });

  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists)
    return res.status(400).json({ success: false, message: 'User/email already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ fullName, username, email, password: hashedPassword });

  console.log(`Send email verification to: ${email}`); // Optional

  res.status(201).json({ success: true, message: 'Account created! Please verify your email.' });
});

// LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ success: false, message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ success: false, message: 'Incorrect password' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ success: true, message: 'Login successful', token });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
