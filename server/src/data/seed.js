import 'dotenv/config'; import mongoose from 'mongoose'; import User from '../models/User.js'; import KnowledgeDocument from '../models/KnowledgeDocument.js'; import Question from '../models/Question.js'; import KnowledgeGap from '../models/KnowledgeGap.js';
const docs = [
  ['Billing SOP', 'SOP', 'Finance', 'For a duplicate payment complaint: verify the payment ID and customer account. Check the payment gateway transaction log for two successful captures. Do not refund until both transactions are confirmed. Create a refund request in FinanceDesk, attach the transaction IDs, and notify the customer that the refund takes 5–7 business days.', ['billing','duplicate payment','refund','FinanceDesk']],
  ['Customer Refund Procedure', 'Procedure', 'Finance', 'Refunds must be approved by the Finance Manager when above $500. Confirm eligibility, submit the refund in FinanceDesk, then send the customer the refund reference and expected processing period.', ['refund','payment','customer']],
  ['Employee Leave Procedure', 'SOP', 'Human Resources', 'Employees request leave in PeopleHub at least three working days in advance. Managers approve or reject within two business days. Medical leave requires a certificate for absences longer than two consecutive days.', ['leave','PeopleHub','HR']],
  ['Product Return Procedure', 'Procedure', 'Operations', 'For damaged deliveries, ask the customer for photos of the product, outer packaging and shipping label within 48 hours. Create a ReturnAssist case, arrange collection, then issue replacement or refund after warehouse inspection.', ['return','damaged delivery','ReturnAssist']],
  ['Customer Support Troubleshooting Guide', 'Guide', 'Support', 'For login issues, confirm the registered email, ask the customer to use Forgot Password, and check the service-status page. Escalate only if the reset email does not arrive after 15 minutes.', ['support','login','password']],
  ['Ticket #102 — Duplicate charge resolved', 'Solved Ticket', 'Support', 'Customer reported two charges for invoice INV-4281. Support verified two successful gateway captures, created FinanceDesk refund RF-771, and told the customer the funds would return within 5–7 business days.', ['duplicate charge','refund','ticket'], '102'],
  ['Ticket #145 — Damaged delivery resolved', 'Solved Ticket', 'Support', 'Customer sent photos of a damaged coffee machine. Support opened ReturnAssist case RA-905, scheduled collection, and issued a replacement after warehouse confirmation.', ['damaged delivery','return','ticket'], '145']
];
await mongoose.connect(process.env.MONGODB_URI); await Promise.all([User.deleteMany({}), KnowledgeDocument.deleteMany({}), Question.deleteMany({}), KnowledgeGap.deleteMany({})]);
const [admin, ravi, priya, amit, neha] = await User.create([
  { name: 'Admin User', email: 'admin@demotech.com', password: 'Admin@123', role: 'admin', department: 'Operations' },
  { name: 'Ravi', email: 'ravi@demotech.com', password: 'Demo@123', role: 'employee', department: 'Finance', expertise: ['Billing', 'Refunds'] },
  { name: 'Priya', email: 'priya@demotech.com', password: 'Demo@123', role: 'employee', department: 'Human Resources', expertise: ['Leave', 'People operations'] },
  { name: 'Amit', email: 'amit@demotech.com', password: 'Demo@123', role: 'employee', department: 'Support', expertise: ['Customer support'] },
  { name: 'Neha', email: 'neha@demotech.com', password: 'Demo@123', role: 'employee', department: 'Sales', expertise: ['Sales'] }
]);
await KnowledgeDocument.insertMany(docs.map(([title,type,category,content,tags,ticketNumber]) => ({ title,type,category,content,tags,ticketNumber,createdBy: admin._id })));
console.log('DemoTech seeded. Admin: admin@demotech.com / Admin@123 | Employee: amit@demotech.com / Demo@123'); await mongoose.disconnect();
