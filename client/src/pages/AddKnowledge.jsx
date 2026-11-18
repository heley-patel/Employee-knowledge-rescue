import { useState } from 'react';
import { api } from '../services/api';
export default function AddKnowledge({ token, setPage }) {
  const [form, setForm] = useState({
    title: '',
    type: 'SOP',
    category: '',
    content: '',
    tags: ''
  });

  const [note, setNote] = useState('');

  const set = (key, value) =>
    setForm({ ...form, [key]: value });

  const submit = async event => {
    event.preventDefault();

    try {
      await api(
        '/api/knowledge',
        {
          method: 'POST',
          body: JSON.stringify(form)
        },
        token
      );

      setNote('Knowledge saved successfully.');

      setTimeout(() => setPage('knowledge'), 700);
    } catch (err) {
      setNote(err.message);
    }
  };

  return (
    <div>
      <header>
        <div>
          <p className="eyebrow">KNOWLEDGE MANAGEMENT</p>
          <h1>Add knowledge</h1>
          <p>Document a reliable process for the whole team.</p>
        </div>
      </header>

      <form className="form panel" onSubmit={submit}>
        {note && <div className="success">{note}</div>}

        <label>
          Title
          <input
            required
            value={form.title}
            onChange={event => set('title', event.target.value)}
            placeholder="e.g. Supplier onboarding procedure"
          />
        </label>

        <div className="two">
          <label>
            Type
            <select
              value={form.type}
              onChange={event => set('type', event.target.value)}
            >
              {['SOP', 'Procedure', 'Guide', 'FAQ', 'Document', 'Solved Ticket'].map(type => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>

          <label>
            Category
            <input
              required
              value={form.category}
              onChange={event => set('category', event.target.value)}
              placeholder="e.g. Finance"
            />
          </label>
        </div>

        <label>
          Tags <small>comma-separated</small>
          <input
            value={form.tags}
            onChange={event => set('tags', event.target.value)}
            placeholder="billing, refunds, customers"
          />
        </label>

        <label>
          Knowledge content
          <textarea
            required
            rows="9"
            value={form.content}
            onChange={event => set('content', event.target.value)}
            placeholder="Write the steps, required checks, tools and escalation rules…"
          />
        </label>

        <button className="primary">Save knowledge</button>
      </form>
    </div>
  );
}