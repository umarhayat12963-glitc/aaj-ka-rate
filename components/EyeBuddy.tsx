'use client';
import { useEffect, useRef } from 'react';

// Small professional badge, bottom-right, pointer-events none.
// Pupils follow mouse/touch gently. Must not cover headings/rates:
// 44px mobile / 56px desktop, no speech bubble.
export default function EyeBuddy() {
  const l = useRef<HTMLDivElement>(null);
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (x: number, y: number) => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      const dx = Math.max(-2.1, Math.min(2.1, (x - cx) / cx * 2.1));
      const dy = Math.max(-2.1, Math.min(2.1, (y - cy) / cy * 2.1));
      [l, r].forEach((el) => { if (el.current) el.current.style.transform = `translate(${dx}px, ${dy}px)`; });
    };
    const onMouse = (e: MouseEvent) => move(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => { const t = e.touches[0]; if (t) move(t.clientX, t.clientY); };
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => { window.removeEventListener('mousemove', onMouse); window.removeEventListener('touchmove', onTouch); };
  }, []);
  return (
    <div className="eyebuddy" aria-hidden="true" title="Eye Buddy">
      <span className="eye"><span className="pupil" ref={l} /></span>
      <span className="eye"><span className="pupil" ref={r} /></span>
    </div>
  );
}
