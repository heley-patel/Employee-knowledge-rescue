import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  question: { type: String, required: true },
  askedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answer: String,
  sources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'KnowledgeDocument' }],
  answered: { type: Boolean, default: false }
}, { timestamps: true });
export default mongoose.model('Question', schema);
