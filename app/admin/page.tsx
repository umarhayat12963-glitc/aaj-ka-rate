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
  const [sqMsg, setSqMsg] = useState('');
  const [hasSavedQs, setHasSavedQs] = useState(false);
  const [ads, setAds] = useState<Array<{ id: string; type: string; placement: string; enabled: boolean; title?: string; publisherId?: string; slotId?: string; link?: string }>>([]);
  const [adMsg, setAdMsg] = useState('');
  const [adType, setAdType] = useState<'adsense' | 'banner' | 'html'>('adsense');
  const [adPlacement, setAdPlacement] = useState('top');
  const [adTitle, setAdTitle] = useState('');
  const [adPublisher, setAdPublisher] = useState('');
  const [adSlot, setAdSlot] = useState('');
  const [adImage, setAdImage] = useState('');
  const [adLink, setAdLink] = useState('');
  const [adCta, setAdCta] = useState('');
  const [adHtml, setAdHtml] = useState('');

  const loadAds = async () => {
    try { const r = await fetch('/api/ads'); const j = await r.json(); if (Array.isArray(j.ads)) setAds(j.ads); } catch {}
  };
  const load = async () => {
    const r = await fetch('/api/admin/status'); const j = await r.json(); setStatus(j);
    if (j.authenticated) {
      const sq = await fetch('/api/admin/security-questions'); const sj = await sq.json();
      if (sj.questions && sj.questions.length) { setQs(sj.questions.map((q: { question: string }) => q.question)); setHasSavedQs(true); }
      loadAds();
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
  const saveQs = async () => {
    if (qs.some((q) => !q) || answers.some((a) => !a.trim())) { setSqMsg('Teeno sawal chunen aur teeno jawab likhen, phir Save karen. Khali chhorne par save nahi hoga.'); return; }
    const j = await post('/api/admin/security-questions', { questions: qs.map((question, i) => ({ question, answer: answers[i] })) });
    setSqMsg(j.ok ? 'Ho gaya — 3 sawal save ho gaye. Ab Forgot Password chalega.' : (j.error || 'Kuch ghalat hua.'));
    if (j.ok) setHasSavedQs(true);
  };
  const saveAd = async () => {
    if (adType === 'adsense' && (!adPublisher.trim() || !adSlot.trim())) { setAdMsg('AdSense ke liye Publisher ID aur Slot ID dono likhen.'); return; }
    if (adType === 'banner' && (!adTitle.trim() || !adLink.trim())) { setAdMsg('Banner ke liye title aur link dono likhen.'); return; }
    if (adType === 'html' && !adHtml.trim()) { setAdMsg('HTML ad ke liye code likhen.'); return; }
    const j = await post('/api/ads', { type: adType, placement: adPlacement, title: adTitle, publisherId: adPublisher, slotId: adSlot, image: adImage, link: adLink, cta: adCta, html: adHtml, enabled: true });
    setAdMsg(j.ok ? 'Ho gaya — ad save ho gaya aur us placement par dikhe ga.' : (j.error || 'Kuch ghalat hua.'));
    if (j.ok) loadAds();
  };
  const deleteAd = async (id: string) => {
    const r = await fetch(`/api/ads?id=${encodeURIComponent(id)}`, { method: 'DELETE' }); const j = await r.json();
    setAdMsg(j.ok ? 'Ad delete ho gaya.' : (j.error || 'Kuch ghalat hua.')); if (j.ok) loadAds();
  };
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
      <p className="small">{hasSavedQs ? 'Pehle se sawal set hain. Jawab security ke liye dikhai nahi dete, is liye dobara save karne par jawab dobara likhna pare ga.' : 'Abhi koi sawal set nahi hai. Teeno sawal chunen aur teeno jawab likhen, phir Save karen.'}</p>
      {qs.map((qq, i) => (<div key={i}><label>Sawal {i + 1}<br /><select value={qq} onChange={(e) => { const a = [...qs]; a[i] = e.target.value; setQs(a); }}><option value="">Sawal chunen</option>{QUESTIONS.map((x) => <option key={x} value={x}>{x}</option>)}</select></label><br />
        <label>Jawab {i + 1}<br /><input value={answers[i]} onChange={(e) => { const a = [...answers]; a[i] = e.target.value; setAnswers(a); }} placeholder="Jawab likhen" /></label></div>))}
      <button onClick={saveQs}>Security Sawal Save Karo</button>
      {sqMsg && <p><strong>{sqMsg}</strong></p>}</section>
    <section className="card"><h2>Ads Manager — Ad Lagao</h2>
      <p className="small">AdSense ke liye apna Publisher ID aur Google approval chahiye. Banner aur third-party HTML turant dikhen ge, AdSense unit Google approval ke baad bhare ga.</p>
      <label>Ad ki qism<br /><select value={adType} onChange={(e) => setAdType(e.target.value as 'adsense' | 'banner' | 'html')}><option value="adsense">Google AdSense</option><option value="banner">Apna Banner</option><option value="html">Doosri network ka HTML code</option></select></label><br />
      <label>Jagah (Placement)<br /><select value={adPlacement} onChange={(e) => setAdPlacement(e.target.value)}><option value="top">Top</option><option value="hero">Bare rates ke neeche</option><option value="middle">Lists ke darmiyan</option><option value="bottom">Neeche</option></select></label><br />
      {adType === 'adsense' && (<><label>Publisher ID (jaise ca-pub-…)<br /><input value={adPublisher} onChange={(e) => setAdPublisher(e.target.value)} placeholder="ca-pub-XXXXXXXXXXXXXXXX" /></label><br />
        <label>Slot ID<br /><input value={adSlot} onChange={(e) => setAdSlot(e.target.value)} placeholder="Slot ID" /></label><br /></>)}
      {adType === 'banner' && (<><label>Banner Title<br /><input value={adTitle} onChange={(e) => setAdTitle(e.target.value)} placeholder="Banner ka naam" /></label><br />
        <label>Image URL (optional)<br /><input value={adImage} onChange={(e) => setAdImage(e.target.value)} placeholder="https://…" /></label><br />
        <label>Link<br /><input value={adLink} onChange={(e) => setAdLink(e.target.value)} placeholder="https://… ya WhatsApp link" /></label><br />
        <label>Button ka lafz (CTA, optional)<br /><input value={adCta} onChange={(e) => setAdCta(e.target.value)} placeholder="Dekhen" /></label><br /></>)}
      {adType === 'html' && (<><label>HTML Code<br /><textarea value={adHtml} onChange={(e) => setAdHtml(e.target.value)} placeholder="<script>… ya ad network ka code" /></label><br />
        <p className="small">HTML code sirf sandboxed iframe me chalega, site ke code me seedha nahi mile ga.</p></>)}
      <button onClick={saveAd}>Ad Save Karo — Ad Lagao</button>
      {adMsg && <p><strong>{adMsg}</strong></p>}
      <h3>Lage hue ads</h3>
      {ads.length === 0 ? <p className="small">Abhi koi ad save nahi hua.</p> : ads.map((a) => (<div key={a.id}><p>{a.type} · {a.placement} · {a.title || a.publisherId || 'Ad'} {a.slotId ? `· Slot ${a.slotId}` : ''} · {a.enabled ? 'On' : 'Off'} <button className="secondary" onClick={() => deleteAd(a.id)}>Delete</button></p></div>))}</section>
    <p>{msg}</p></main>);
}
