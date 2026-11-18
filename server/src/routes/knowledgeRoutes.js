import express from 'express';
import KnowledgeDocument from '../models/KnowledgeDocument.js';
import { protect, adminOnly } from '../middleware/auth.js';
const router = express.Router();

router.get('/', protect, async (req, res) => {
  const query = String(req.query.q || '').trim();

  const filter = query
    ? { $text: { $search: query } }
    : {};

  const docs = await KnowledgeDocument.find(
    filter,
    query ? { score: { $meta: 'textScore' } } : {}
  )
    .sort(
      query
        ? { score: { $meta: 'textScore' } }
        : { createdAt: -1 }
    )
    .limit(50);

  res.json(docs);
});

router.post('/', protect, adminOnly, async (req, res) => {
  const { title, type, category, content, tags, ticketNumber } = req.body;

  if (!title || !category || !content)
    return res.status(400).json({
      message: 'Title, category and content are required.'
    });

  const doc = await KnowledgeDocument.create({
    title,
    type,
    category,
    content,
    tags: Array.isArray(tags)
      ? tags
      : String(tags || '')
          .split(',')
          .map(x => x.trim())
          .filter(Boolean),
    ticketNumber,
    createdBy: req.user._id
  });

  res.status(201).json(doc);
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  await KnowledgeDocument.findByIdAndDelete(req.params.id);

  res.status(204).end();
});

export default router;