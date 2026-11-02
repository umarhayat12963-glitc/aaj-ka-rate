'use client';
import { useEffect, useState } from 'react';

type Status = { hasAccount: boolean; authenticated: boolean; username?: string | null };
const QUESTIONS = ['Aap ke pehle school ka naam kya tha?', 'Aap ki walida ka naam kya hai?', 'Aap ke bachpan ke sheher ka naam kya tha?', 'Aap ka pasandeeda janwar kya hai?', 'Aap ke pehle ustad ka naam kya tha?'];

export default function Admin() {
  const [status, setStatus] = useState<Status | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [msg, setMsg] = useState('');
  const [mode, setMode] = useState<'login' | 'forgot'>('login');
  const [newUsername, setNewUsername] = useState('');
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [qs, setQs] = useState(['', '', '']);
  const [answers, setAnswers] = useState(['', '', '']);
  const [forgotQs, setForgotQs] = useState<string[]>([]);
  const [forgotAnswers, setForgotAnswers] = useState(['', '', '']);
  const [forgotNewPw, setForgotNewPw] = useState('');

  const load = async () => {
    const r = await fetch('/api/admin/status'); const j = await r.json(); setStatus(j);
    if (j.authenticated) {
      const sq = await fetch('/api/admin/security-questions'); const sj = await sq.json();
      if (sj.questions) setQs(sj.questions.map((q: { question: string }) => q.question));
    }
  };
  useEffect(() => { load(); }, []);

  const post = async (url: string, body: unknown) => {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const j = await r.json(); setMsg(j.ok ? 'Ho gaya.' : (j.error || 'Kuch ghalat hua.')); return j;
  };
  const setup = async () => { const j = await post('/api/admin/setup', { username, password }); if (j.ok) load(); };
  const login = async () => { const j = await post('/api/admin/login', { username, password }); if (j.ok) load(); };
  const logout = async () => { await post('/api/admin/logout', {}); setStatus(null); load(); };
  const changeCreds = async () => { const j = await post('/api/admin/change-credentials', { newUsername, currentPassword: currentPw, newPassword: newPw }); if (j.ok) load(); };
  const saveQs = async () => { await post('/api/admin/security-questions', { questions: qs.map((question, i) => ({ question, answer: answers[i] })) }); };
  const startForgot = async () => { const r = await fetch('/api/admin/forgot-password'); const j = await r.json(); if (j.questions) { setForgotQs(j.questions); setMode('forgot'); } else setMsg(j.error || 'Security sawal set nahi hain.'); };
  const doForgot = async () => { const j = await post('/api/admin/forgot-password', { answers: forgotAnswers, newPassword: forgotNewPw }); if (j.ok) { setMode('login'); load(); } };

  if (!status) return <main><p>Loading…</p></main>;
  if (!status.hasAccount) {
    return (<main><h1>Ads Admin Panel — Pehli Dafa Setup</h1><p>Yahan koi default username/password nahi hai. Apna username aur password khud banayen.</p>
      <label>Username<br /><input value={username} onChange={(e) => setUsername(e.target.value)} /></label><br />
      <label>Password<br /><input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} /> <button className="secondary" onClick={() => setShowPw(!showPw)}>{showPw ? '🙈 Chhupao' : '👁 Dikhao'}</button></label><br />
      <button onClick={setup}>Setup Karo</button><p>{msg}</p></main>);
  }
  if (!status.authenticated) {
    if (mode === 'forgot') {
      return (<main><h1>Forgot Password</h1>{forgotQs.map((qq, i) => (<div key={i}><label>{qq}<br /><input value={forgotAnswers[i]} onChange={(e) => { const a = [...forgotAnswers]; a[i] = e.target.value; setForgotAnswers(a); }} /></label></div>))}
        <label>Naya Password<br /><input type={showPw ? 'text' : 'password'} value={forgotNewPw} onChange={(e) => setForgotNewPw(e.target.value)} /> <button className="secondary" onClick={() => setShowPw(!showPw)}>{showPw ? '🙈 Chhupao' : '👁 Dikhao'}</button></label><br />
        <button onClick={doForgot}>Naya Password Set Karo</button> <button className="secondary" onClick={() => setMode('login')}>Wapas Login</button><p>{msg}</p></main>);
    }
    return (<main><h1>Ads Admin Panel — Login</h1>
      <label>Username<br /><input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Apna username likhen" /></label><br />
      <label>Password<br /><input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} /> <button className="secondary" onClick={() => setShowPw(!showPw)}>{showPw ? '🙈 Chhupao' : '👁 Dikhao'}</button></label><br />
      <button onClick={login}>Login</button><p><button className="secondary" onClick={startForgot}>Forgot Password?</button></p><p>{msg}</p></main>);
  }
  return (<main><h1>Ads Admin Panel</h1><p>Login: {status.username} · <button className="secondary" onClick={logout}>Logout</button></p>
    <section className="card"><h2>Username / Password Badlo</h2>
      <label>Naya Username<br /><input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} /></label><br />
      <label>Current Password<br /><input type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} /></label><br />
      <label>Naya Password<br /><input type={showPw ? 'text' : 'password'} value={newPw} onChange={(e) => setNewPw(e.target.value)} /> <button className="secondary" onClick={() => setShowPw(!showPw)}>{showPw ? '🙈 Chhupao' : '👁 Dikhao'}</button></label><br />
      <button onClick={changeCreds}>Badlo</button></section>
    <section className="card"><h2>🔒 Security Sawal — Forgot Password ke liye</h2>
      {qs.map((qq, i) => (<div key={i}><label>Sawal {i + 1}<br /><select value={qq} onChange={(e) => { const a = [...qs]; a[i] = e.target.value; setQs(a); }}><option value="">Sawal chunen</option>{QUESTIONS.map((x) => <option key={x} value={x}>{x}</option>)}</select></label><br />
        <label>Jawab<br /><input value={answers[i]} onChange={(e) => { const a = [...answers]; a[i] = e.target.value; setAnswers(a); }} /></label></div>))}
      <button onClick={saveQs}>Security Sawal Save Karo</button></section>
    <section className="card"><h2>Ads Manager</h2><p>AdSense: Publisher ID aur Slot IDs Ads API se set karen. Banner aur third-party code (sandboxed iframe) bhi yahan se manage honge. Production me /api/ads ko session se protect kiya gaya hai.</p>
      <p className="small">Note: Is deployable version me ads ka poora CRUD /api/ads route par hai — POST/DELETE ke liye login zaroori hai. AdSense ke liye apna Publisher ID aur Google approval chahiye.</p></section>
    <p>{msg}</p></main>);
}
