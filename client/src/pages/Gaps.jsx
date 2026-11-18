import { useEffect, useState } from 'react';
import { CircleHelp } from 'lucide-react';
import { api } from '../services/api';
export default function Gaps({ token }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/api/admin/gaps', {}, token)
      .then(setItems)
      .catch(err => setError(err.message));
  }, [token]);

  return (
    <div>
      <header>
        <div>
          <p className="eyebrow">KNOWLEDGE GAPS</p>
          <h1>What needs documenting?</h1>
          <p>
            Questions without sufficient supporting knowledge appear here automatically.
          </p>
        </div>
      </header>

      {error && <div className="error">{error}</div>}

      <div className="docs">
        {items.map(item => (
          <article key={item._id}>
            <div className="doc-icon red">
              <CircleHelp size={19} />
            </div>

            <div>
              <span>
                Asked {item.count} {item.count === 1 ? 'time' : 'times'}
                {' · '}last asked {new Date(item.lastAskedAt).toLocaleDateString()}
              </span>

              <h3>{item.question}</h3>

              <p>
                Consider adding an SOP, procedure, FAQ or solved ticket to cover this question.
              </p>
            </div>
          </article>
        ))}

        {!items.length && !error && (
          <div className="empty">
            Great—no gaps have been identified yet.
          </div>
        )}
      </div>
    </div>
  );
}