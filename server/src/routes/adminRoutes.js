import express from 'express';
import User from '../models/User.js'; import KnowledgeDocument from '../models/KnowledgeDocument.js'; import Question from '../models/Question.js'; import KnowledgeGap from '../models/KnowledgeGap.js';
import { protect, adminOnly } from '../middleware/auth.js';
const router = express.Router();

router.use(protect, adminOnly);

router.get('/dashboard', async (req, res) =>
  res.json({
    employees: await User.countDocuments({ role: 'employee' }),
    documents: await KnowledgeDocument.countDocuments(),
    tickets: await KnowledgeDocument.countDocuments({
      type: 'Solved Ticket'
    }),
    questions: await Question.countDocuments(),
    unanswered: await Question.countDocuments({ answered: false }),
    gaps: await KnowledgeGap.countDocuments()
  })
);

router.get('/gaps', async (req, res) =>
  res.json(
    await KnowledgeGap.find().sort({
      count: -1,
      lastAskedAt: -1
    })
  )
);

router.get('/users', async (req, res) =>
  res.json(
    await User.find()
      .select('-password')
      .sort({ role: 1, name: 1 })
  )
);

router.post('/users', async (req, res) => {
  const { name, email, password, role, department, expertise } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({
      message: 'Name, email and password are required.'
    });

  res.status(201).json(
    await User.create({
      name,
      email,
      password,
      role,
      department,
      expertise
    })
  );
});

export default router;