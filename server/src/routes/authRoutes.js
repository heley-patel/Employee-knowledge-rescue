import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();
const tokenFor = user => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: String(email).toLowerCase() }).select('+password');
  if (!user || !(await user.matchesPassword(password))) return res.status(401).json({ message: 'Invalid email or password.' });
  res.json({ token: tokenFor(user), user: { id: user._id, name: user.name, email: user.email, role: user.role, department: user.department } });
});
router.get('/me', protect, (req, res) => res.json(req.user));
export default router;
