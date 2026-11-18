import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  normalizedQuestion: { type: String, unique: true, required: true },
  question: { type: String, required: true },
  count: { type: Number, default: 1 },
  lastAskedAt: { type: Date, default: Date.now },
  askedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });
export default mongoose.model('KnowledgeGap', schema);
