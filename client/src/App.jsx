import { useState } from 'react';
import Nav from './components/Nav';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Knowledge from './pages/Knowledge';
import Assistant from './pages/Assistant';
import History from './pages/History';
import Gaps from './pages/Gaps';
import AddKnowledge from './pages/AddKnowledge';
import Employees from './pages/Employees';

export default function App() {
  const [session, setSession] = useState(() => { try { return JSON.parse(localStorage.getItem('ekr-session')); } catch { return null; } });
  const [page, setPage] = useState('dashboard');
  const login = newSession => { localStorage.setItem('ekr-session', JSON.stringify(newSession)); setSession(newSession); };
  const logout = () => { localStorage.removeItem('ekr-session'); setSession(null); };
  if (!session) return <Login onLogin={login}/>;
  const props = { token: session.token, user: session.user, setPage };
  const pages = { dashboard: <Dashboard {...props}/>, knowledge: <Knowledge {...props}/>, assistant: <Assistant {...props}/>, history: <History {...props}/>, gaps: <Gaps {...props}/>, add: <AddKnowledge {...props}/>, employees: <Employees {...props}/> };
  return <div className="app"><Nav page={page} setPage={setPage} user={session.user} logout={logout}/><main className="content">{pages[page] || pages.dashboard}</main></div>;
}
