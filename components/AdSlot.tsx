'use client';
import { useEffect, useState } from 'react';

type Ad = {
  id: string; type: 'adsense' | 'banner' | 'html'; placement: string; enabled: boolean;
  title?: string; image?: string; link?: string; cta?: string;
  publisherId?: string; slotId?: string; html?: string;
};

declare global { interface Window { adsbygoogle?: unknown[] } }

export default function AdSlot({ placement, label }: { placement: string; label: string }) {
  const [ads, setAds] = useState<Ad[] | null>(null);
  useEffect(() => {
    fetch('/api/ads').then((r) => r.json()).then((j) => {
      const list = Array.isArray(j.ads) ? j.ads.filter((a: Ad) => a.placement === placement) : [];
      setAds(list);
    }).catch(() => setAds([]));
  }, [placement]);
  const adsenseAds = (ads || []).filter((a) => a.type === 'adsense' && a.publisherId && a.slotId);
  useEffect(() => {
    if (!adsenseAds.length) return;
    const first = adsenseAds[0];
    const src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(first.publisherId || '')}`;
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement('script');
      s.async = true; s.src = src; s.crossOrigin = 'anonymous';
      document.head.appendChild(s);
    }
    const t = setTimeout(() => {
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
    }, 300);
    return () => clearTimeout(t);
  }, [ads]);
  if (!ads || ads.length === 0) {
    return (
      <div className="adslot" data-placement={placement}>
        <strong>Advertisement · Ishtihar ki Jagah</strong>
        <div className="small">{label} — AdSense ya banner yahan aaye ga jab owner Ads Manager se lagaye ga.</div>
      </div>
    );
  }
  return (
    <div className="adslot" data-placement={placement}>
      {ads.map((a) => {
        if (a.type === 'adsense') {
          if (!a.publisherId || !a.slotId) return null;
          return (
            <ins key={a.id} className="adsbygoogle" style={{ display: 'block' }}
              data-ad-client={a.publisherId} data-ad-slot={a.slotId}
              data-ad-format="auto" data-full-width-responsive="true" />
          );
        }
        if (a.type === 'banner') {
          return (
            <div key={a.id}>
              {a.image && a.link ? <a href={a.link} target="_blank" rel="noopener noreferrer"><img src={a.image} alt={a.title || 'Ad'} style={{ maxWidth: '100%' }} /></a> : null}
              <div><strong>{a.title || ''}</strong></div>
              {a.link && <a href={a.link} target="_blank" rel="noopener noreferrer">{a.cta || 'Dekhen'}</a>}
            </div>
          );
        }
        if (a.type === 'html' && a.html) {
          return <iframe key={a.id} sandbox="allow-scripts" srcDoc={a.html} title={a.title || 'Ad'} style={{ width: '100%', border: 0, minHeight: 100 }} />;
        }
        return null;
      })}
    </div>
  );
}
