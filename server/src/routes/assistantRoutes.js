import express from 'express';
import KnowledgeDocument from '../models/KnowledgeDocument.js';
import Question from '../models/Question.js';
import KnowledgeGap from '../models/KnowledgeGap.js';
import { protect } from '../middleware/auth.js';
import { createGroundedAnswer } from '../services/knowledgeAssistant.js';
const router = express.Router();

const words = text =>
  String(text).toLowerCase().match(/[a-z]{3,}/g) || [];

router.post('/ask', protect, async (req, res) => {
  const question = String(req.body.question || '').trim();

  if (question.length < 5)
    return res.status(400).json({
      message: 'Please enter a more detailed question.'
    });

  const terms = words(question).slice(0, 12);

  const docs = await KnowledgeDocument.find(
    terms.length
      ? {
          $or: terms.flatMap(term => [
            { title: new RegExp(term, 'i') },
            { content: new RegExp(term, 'i') },
            { tags: new RegExp(term, 'i') }
          ])
        }
      : {}
  ).limit(12);

  const scored = docs
    .map(doc => ({
      doc,
      score: terms.reduce(
        (n, term) =>
          n +
          (
            `${doc.title} ${doc.category} ${(doc.tags || []).join(' ')} ${doc.content}`
              .toLowerCase()
              .match(new RegExp(term, 'g')) || []
          ).length,
        0
      )
    }))
    .sort((a, b) => b.score - a.score);

  const sources = scored
    .filter(x => x.score > 0)
    .slice(0, 3)
    .map(x => x.doc);

  const sufficient = sources.length > 0 && scored[0].score >= 2;

  let answer;

  if (sufficient) {
    answer = await createGroundedAnswer(question, sources);
  } else {
    answer = "I couldn't find this information in the company's knowledge base.";

    const normalizedQuestion = words(question).sort().join(' ');

    await KnowledgeGap.findOneAndUpdate(
      { normalizedQuestion },
      {
        $set: {
          question,
          lastAskedAt: new Date()
        },
        $inc: {
          count: 1
        },
        $addToSet: {
          askedBy: req.user._id
        }
      },
      { upsert: true }
    );
  }

  const record = await Question.create({
    question,
    askedBy: req.user._id,
    answer,
    sources: sources.map(s => s._id),
    answered: sufficient
  });

  res.json({
    id: record._id,
    answer,
    answered: sufficient,
    sources: sources.map(s => ({
      id: s._id,
      title: s.title,
      type: s.type,
      ticketNumber: s.ticketNumber
    }))
  });
});

router.get('/history', protect, async (req, res) =>
  res.json(
    await Question.find(
      req.user.role === 'admin'
        ? {}
        : { askedBy: req.user._id }
    )
      .populate('sources', 'title type ticketNumber')
      .sort({ createdAt: -1 })
      .limit(50)
  )
);

export default router;