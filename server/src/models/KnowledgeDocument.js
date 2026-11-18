import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  type: { type: String, enum: ['SOP', 'Procedure', 'Guide', 'FAQ', 'Document', 'Solved Ticket'], default: 'Document' },
  category: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  tags: [String],
  ticketNumber: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
schema.index({ title: 'text', content: 'text', tags: 'text', category: 'text' });
export default mongoose.model('KnowledgeDocument', schema);
