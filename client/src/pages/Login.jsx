import { useState } from 'react';
import { BrainCircuit } from 'lucide-react';
import { api } from '../services/api';
export default function Login({ onLogin }) {
  const [email, setEmail] = useState('amit@demotech.com');
  const [password, setPassword] = useState('Demo@123');
  const [error, setError] = useState('');

  const submit = async event => {
    event.preventDefault();

    try {
      onLogin(
        await api('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        })
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="login">
      <section>
        <div className="logo">
          <BrainCircuit /> Employee Knowledge Rescue
        </div>

        <h1>
          Keep company knowledge
          <br />
          <em>within reach.</em>
        </h1>

        <p>
          DemoTech Solutions’ internal knowledge hub turns documents and team
          experience into trustworthy answers.
        </p>

        <div className="login-note">
          Try the demo: <b>amit@demotech.com / Demo@123</b>
          <br />
          Admin: <b>admin@demotech.com / Admin@123</b>
        </div>
      </section>

      <form onSubmit={submit}>
        <h2>Welcome back</h2>
        <p>Sign in to continue to your knowledge hub.</p>

        {error && <div className="error">{error}</div>}

        <label>
          Email
          <input
            value={email}
            onChange={event => setEmail(event.target.value)}
            type="email"
          />
        </label>

        <label>
          Password
          <input
            value={password}
            onChange={event => setPassword(event.target.value)}
            type="password"
          />
        </label>

        <button className="primary">Sign in</button>
      </form>
    </main>
  );
}
