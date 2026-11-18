import 'dotenv/config';
import express from 'express'; import cors from 'cors'; import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js'; import knowledgeRoutes from './routes/knowledgeRoutes.js'; import assistantRoutes from './routes/assistantRoutes.js'; import adminRoutes from './routes/adminRoutes.js';
const app = express(); app.use(cors()); app.use(express.json({ limit: '1mb' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes); app.use('/api/knowledge', knowledgeRoutes); app.use('/api/assistant', assistantRoutes); app.use('/api/admin', adminRoutes);
app.use((err, req, res, next) => { console.error(err); res.status(500).json({ message: err.code === 11000 ? 'That email already exists.' : 'Something went wrong. Please try again.' }); });
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI).then(() => app.listen(port, () => console.log(`API running on ${port}`))).catch(error => { console.error('MongoDB connection failed:', error.message); process.exit(1); });
