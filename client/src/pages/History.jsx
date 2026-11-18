import { useEffect, useState } from 'react';
import { BrainCircuit } from 'lucide-react';
import { api } from '../services/api';
export default function History({ token }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/api/assistant/history', {}, token)
      .then(setItems)
      .catch(err => setError(err.message));
  }, [token]);

  return (
    <div>
      <header>
        <div>
          <p className="eyebrow">QUESTION HISTORY</p>
          <h1>Previous questions</h1>
          <p>Review answers and their supporting company sources.</p>
        </div>
      </header>

      {error && <div className="error">{error}</div>}

      <div className="docs">
        {items.map(item => (
          <article key={item._id}>
            <div className="doc-icon">
              <BrainCircuit size={19} />
            </div>

            <div>
              <span>
                {new Date(item.createdAt).toLocaleDateString()}
                {' · '}
                {item.answered ? 'Answered' : 'Knowledge gap'}
              </span>

              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          </article>
        ))}

        {!items.length && !error && (
          <div className="empty">No questions yet.</div>
        )}
      </div>
    </div>
  );
}