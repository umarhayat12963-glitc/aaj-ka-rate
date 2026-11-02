'use client';
import React from 'react';

// Placeholder slot. In production, /api/ads returns owner ads and
// AdSense units are rendered only when a Publisher ID + Slot ID exist.
export default function AdSlot({ placement, label }: { placement: string; label: string }) {
  return (
    <div className="adslot" data-placement={placement}>
      <strong>Advertisement · Ishtihar ki Jagah</strong>
      <div className="small">{label} — AdSense ya banner yahan aaye ga jab owner Ads Manager se lagaye ga.</div>
    </div>
  );
}
