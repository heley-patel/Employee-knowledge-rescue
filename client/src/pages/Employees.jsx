import { useEffect, useState } from 'react';
import { api } from '../services/api';
export default function Employees({ token }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/api/admin/users', {}, token)
      .then(setUsers)
      .catch(err => setError(err.message));
  }, [token]);

  return (
    <div>
      <header>
        <div>
          <p className="eyebrow">EMPLOYEE MANAGEMENT</p>
          <h1>Team directory</h1>
          <p>People whose knowledge keeps DemoTech moving.</p>
        </div>
      </header>

      {error && <div className="error">{error}</div>}

      <div className="docs">
        {users.map(user => (
          <article key={user._id}>
            <div className="avatar">{user.name[0]}</div>

            <div>
              <span>{user.role} · {user.department}</span>
              <h3>{user.name}</h3>

              <p>
                {user.email}
                {user.expertise?.length
                  ? ` · Expertise: ${user.expertise.join(', ')}`
                  : ''}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}