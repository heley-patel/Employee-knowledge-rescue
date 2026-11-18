import { useEffect, useState } from 'react';
import { FileText, Search } from 'lucide-react';
import { api } from '../services/api';

export default function Knowledge({ token }) {
  const [docs, setDocs] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const load = () =>
    api(
      `/api/knowledge${query ? `?q=${encodeURIComponent(query)}` : ''}`,
      {},
      token
    )
      .then(setDocs)
      .catch(err => setError(err.message));

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <header>
        <div>
          <p className="eyebrow">KNOWLEDGE LIBRARY</p>
          <h1>Company knowledge</h1>
          <p>Search verified SOPs, procedures, guides and solved tickets.</p>
        </div>
      </header>

      <div className="search">
        <Search size={19} />

        <input
          value={query}
          onChange={event => setQuery(event.target.value)}
          onKeyDown={event => event.key === 'Enter' && load()}
          placeholder="Search duplicate payment, leave, damaged delivery..."
        />

        <button onClick={load}>Search</button>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="docs">
        {docs.map(doc => (
          <article key={doc._id}>
            <div className="doc-icon">
              <FileText size={19} />
            </div>

            <div>
              <span>{doc.type} · {doc.category}</span>

              <h3>{doc.title}</h3>

              <p>{doc.content}</p>

              <div className="tags">
                {doc.tags?.map(tag => (
                  <i key={tag}>{tag}</i>
                ))}
              </div>
            </div>
          </article>
        ))}

        {!docs.length && !error && (
          <div className="empty">
            No knowledge items match this search.
          </div>
        )}
      </div>
    </div>
  );
}
