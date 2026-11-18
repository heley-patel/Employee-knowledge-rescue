import { BookOpen, BrainCircuit, Users, FileText, CircleHelp, Plus, LogOut, BarChart3 } from 'lucide-react';

export default function Nav({ page, setPage, user, logout }) {
  const adminItems = [
    ['dashboard', 'Dashboard', BarChart3],
    ['knowledge', 'Knowledge library', BookOpen],
    ['add', 'Add knowledge', Plus],
    ['employees', 'Employees', Users],
    ['gaps', 'Knowledge gaps', CircleHelp]
  ];

  const employeeItems = [
    ['dashboard', 'Dashboard', BarChart3],
    ['assistant', 'Ask the assistant', BrainCircuit],
    ['knowledge', 'Knowledge library', BookOpen],
    ['history', 'Question history', FileText]
  ];

  const items = user.role === 'admin' ? adminItems : employeeItems;

  return (
    <aside>
      <div className="brand">
        <BrainCircuit />
        <span>
          Knowledge
          <br />
          Rescue
        </span>
      </div>

      <nav>
        {items.map(([id, label, Icon]) => (
          <button
            className={page === id ? 'active' : ''}
            onClick={() => setPage(id)}
            key={id}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>

      <div className="profile">
        <div className="avatar">{user.name[0]}</div>

        <div>
          <b>{user.name}</b>
          <small>{user.role} · {user.department}</small>
        </div>

        <button onClick={logout} title="Sign out">
          <LogOut size={17} />
        </button>
      </div>
    </aside>
  );
}