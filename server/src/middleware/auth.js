import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Please sign in to continue.' });
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(id);
    if (!req.user) return res.status(401).json({ message: 'Account not found.' });
    next();
  } catch { res.status(401).json({ message: 'Your session is invalid or expired.' }); }
};
export const adminOnly = (req, res, next) => req.user.role === 'admin' ? next() : res.status(403).json({ message: 'Admin access required.' });
