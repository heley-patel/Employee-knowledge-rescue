import { useEffect, useState } from 'react';
import { BookOpen, BrainCircuit, Users, FileText, CircleHelp, Search, Plus, BarChart3, TicketCheck } from 'lucide-react';
import { api } from '../services/api';
import Stat from '../components/Stat';

export default function Dashboard({ user, token, setPage }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (user.role === 'admin')
      api('/api/admin/dashboard', {}, token)
        .then(setData)
        .catch(() => {});
  }, [user.role, token]);

  if (user.role === 'employee')
    return (
      <div>
        <header>
          <div>
            <p className="eyebrow">YOUR WORKSPACE</p>
            <h1>Good morning, {user.name}</h1>
            <p>Find answers from DemoTech’s verified company knowledge.</p>
          </div>

          <button className="primary" onClick={() => setPage('assistant')}>
            <BrainCircuit size={17} /> Ask a question
          </button>
        </header>

        <div className="hero">
          <BrainCircuit />
          <div>
            <h2>What can I help you find?</h2>
            <p>
              Search procedures, SOPs, resolved tickets and team knowledge—without guessing.
            </p>
            <button onClick={() => setPage('assistant')}>
              Open Knowledge Assistant <span>→</span>
            </button>
          </div>
        </div>

        <h2 className="section-title">Explore knowledge</h2>

        <div className="feature-grid">
          <button onClick={() => setPage('knowledge')}>
            <BookOpen /> Browse all documents
          </button>

          <button onClick={() => setPage('history')}>
            <FileText /> Review your question history
          </button>

          <button onClick={() => setPage('assistant')}>
            <Search /> Ask a verified question
          </button>
        </div>
      </div>
    );

  const stats = [
    [Users, 'Employees', 'blue', 'employees'],
    [BookOpen, 'Knowledge documents', 'purple', 'documents'],
    [TicketCheck, 'Solved tickets', 'green', 'tickets'],
    [BrainCircuit, 'Questions asked', 'orange', 'questions'],
    [CircleHelp, 'Unanswered', 'red', 'unanswered'],
    [BarChart3, 'Knowledge gaps', 'pink', 'gaps']
  ];

  return (
    <div>
      <header>
        <div>
          <p className="eyebrow">ADMIN OVERVIEW</p>
          <h1>Knowledge at a glance</h1>
          <p>See how DemoTech’s institutional knowledge is being used.</p>
        </div>

        <button className="primary" onClick={() => setPage('add')}>
          <Plus size={17} /> Add knowledge
        </button>
      </header>

      <div className="stats">
        {stats.map(([Icon, label, tint, key]) => (
          <Stat
            key={key}
            icon={Icon}
            label={label}
            tint={tint}
            value={data?.[key]}
          />
        ))}
      </div>

      <div className="panel">
        <h2>Turn questions into stronger knowledge</h2>
        <p>
          Unanswered questions are automatically collected as knowledge gaps.
          Review them to decide what the team should document next.
        </p>

        <button className="secondary" onClick={() => setPage('gaps')}>
          Review knowledge gaps
        </button>
      </div>
    </div>
  );
}
