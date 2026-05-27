import { useState, useEffect, useRef } from 'react';
import { Input, Button } from '../../../../ui';

function WarnBanner({ message }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 14px', borderRadius: 8, background: 'rgba(237,137,54,0.08)', border: '1px solid rgba(237,137,54,0.3)', fontSize: 12, color: 'var(--osmos-fg)', fontFamily: "'Open Sans', sans-serif" }}>
      <span style={{ flexShrink: 0 }}>⚠️</span>
      <span>{message}</span>
    </div>
  );
}

// ── Launch animation state machine ───────────────────────────────────────────
// idle → launching (0–600ms) → success (600–1800ms) → done

function useTypewriter(text, speed = 40) {
  const [displayed, setDisplayed] = useState('');
  const idx = useRef(0);
  useEffect(() => {
    setDisplayed('');
    idx.current = 0;
    if (!text) return;
    const timer = setInterval(() => {
      idx.current += 1;
      setDisplayed(text.slice(0, idx.current));
      if (idx.current >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return displayed;
}

function SectionReview({ title, stepId, children, onEdit }) {
  return (
    <div style={{ background: 'var(--osmos-bg)', border: `1px solid var(--osmos-border)`, borderRadius: 10, overflow: 'hidden', marginBottom: 12, fontFamily: "'Open Sans', sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid var(--osmos-border)`, background: 'var(--osmos-bg-subtle)' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--osmos-fg)' }}>{title}</span>
        <button
          onClick={() => onEdit(stepId)}
          style={{ fontSize: 12, color: 'var(--osmos-brand-primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontFamily: "'Open Sans', sans-serif" }}
        >
          Edit →
        </button>
      </div>
      <div style={{ padding: '14px 16px' }}>
        {children}
      </div>
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 8, fontFamily: "'Open Sans', sans-serif" }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)', width: 130, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 12, color: 'var(--osmos-fg)' }}>{value || <span style={{ color: 'var(--osmos-fg-subtle)' }}>—</span>}</span>
    </div>
  );
}

function LaunchButton({ onLaunchClick, launchState }) {
  const STATES = {
    idle:      { label: '🚀 Launch Campaign', bg: 'var(--osmos-brand-primary)',  color: '#fff' },
    launching: { label: 'Launching...',        bg: 'var(--osmos-brand-primary)',  color: '#fff' },
    success:   { label: '✓ Launched!',         bg: 'var(--osmos-brand-green)',   color: '#fff' },
  };
  const s = STATES[launchState] || STATES.idle;

  return (
    <button
      onClick={launchState === 'idle' ? onLaunchClick : undefined}
      disabled={launchState !== 'idle'}
      style={{
        padding: '10px 24px', borderRadius: 8, border: 'none', cursor: launchState === 'idle' ? 'pointer' : 'default',
        background: s.bg, color: s.color, fontSize: 14, fontWeight: 700, fontFamily: "'Open Sans', sans-serif",
        display: 'flex', alignItems: 'center', gap: 8,
        transition: 'background 0.3s, transform 0.15s',
        transform: launchState === 'launching' ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: launchState === 'idle' ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
      }}
    >
      {launchState === 'launching' && (
        <span style={{ display: 'inline-block', animation: 'spin 0.6s linear infinite', fontSize: 14 }}>⟳</span>
      )}
      {s.label}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}

export default function ReviewLaunchStep({ campaignData, onChange, onStepClick, onLaunch }) {
  const [launchState, setLaunchState] = useState('idle'); // 'idle' | 'launching' | 'success'

  // Auto-suggest campaign name
  const suggestedName = (() => {
    const ch = campaignData.channels?.[0];
    if (!ch) return '';
    const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' });
    return `${ch.channel} · ${ch.objective} · ${date}`;
  })();

  // Fill name with typewriter on mount if empty
  const typewriterName = useTypewriter(
    campaignData.campaignName ? '' : suggestedName,
    40
  );

  useEffect(() => {
    if (!campaignData.campaignName && typewriterName) {
      onChange({ campaignName: typewriterName });
    }
  }, [typewriterName]);

  function handleLaunch() {
    setLaunchState('launching');
    setTimeout(() => {
      setLaunchState('success');
      setTimeout(() => {
        onLaunch?.(campaignData);
      }, 600);
    }, 600);
  }

  const ch = campaignData.channels?.[0];
  const aud = campaignData.audience;
  const budget = campaignData.budget;
  const productCount = campaignData.selectedProducts?.length || 0;
  const creativeCount = campaignData.creatives?.length || 0;

  // Validation warnings
  const warnings = [];
  if (creativeCount === 0) warnings.push('No creatives uploaded. Add at least one ad creative before launching.');
  if (!budget?.bidStrategy) warnings.push('No bid strategy selected. Default (CBO) will be applied.');
  if (!budget?.endDate) warnings.push('No end date set. Campaign will run until manually paused.');

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", maxWidth: 680 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--osmos-fg)', margin: '0 0 4px' }}>
        Review & Launch
      </h2>
      <p style={{ fontSize: 13, color: 'var(--osmos-fg-muted)', margin: '0 0 24px' }}>
        Review your campaign details. You can edit any section before launching.
      </p>

      {/* Campaign name */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--osmos-fg-muted)', display: 'block', marginBottom: 6, fontFamily: "'Open Sans', sans-serif" }}>
          Campaign Name
        </label>
        <Input
          value={campaignData.campaignName}
          onChange={e => onChange({ campaignName: e.target.value })}
          placeholder={suggestedName}
          style={{ fontSize: 14, fontFamily: "'Open Sans', sans-serif" }}
        />
        <p style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', margin: '4px 0 0', fontFamily: "'Open Sans', sans-serif" }}>
          Auto-suggested from your selections. Edit if needed.
        </p>
      </div>

      {/* Validation warnings */}
      {warnings.map((w, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <WarnBanner message={w} />
        </div>
      ))}

      {/* Review sections */}
      <SectionReview title="Channel & Objective" stepId={1} onEdit={onStepClick}>
        {ch ? (
          <>
            <ReviewRow label="Channel" value={ch.channel} />
            <ReviewRow label="Objective" value={ch.objective} />
          </>
        ) : (
          <span style={{ fontSize: 12, color: 'var(--osmos-brand-amber)' }}>⚠ Not configured</span>
        )}
      </SectionReview>

      <SectionReview title="Audience & Targeting" stepId={2} onEdit={onStepClick}>
        {aud ? (
          <>
            <ReviewRow label="Age Range" value={`${aud.ageMin} – ${aud.ageMax}`} />
            <ReviewRow label="Gender" value={aud.gender === 'all' ? 'All genders' : aud.gender === 'male' ? 'Male' : 'Female'} />
            <ReviewRow label="Location" value={aud.location} />
            {(aud.customAudiences || []).length > 0 && (
              <ReviewRow label="Custom Audiences" value={aud.customAudiences.join(', ')} />
            )}
            {(aud.pixelEvents || []).length > 0 && (
              <ReviewRow label="Pixel Events" value={aud.pixelEvents.join(', ')} />
            )}
          </>
        ) : (
          <span style={{ fontSize: 12, color: 'var(--osmos-brand-amber)' }}>⚠ Not configured</span>
        )}
      </SectionReview>

      <SectionReview title="Products" stepId={3} onEdit={onStepClick}>
        <ReviewRow label="Products selected" value={productCount > 0 ? `${productCount} product${productCount !== 1 ? 's' : ''}` : undefined} />
        {productCount > 0 && campaignData.selectedProducts?.slice(0, 3).map(p => (
          <div key={p.id} style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', paddingLeft: 130, marginBottom: 2, fontFamily: "'Open Sans', sans-serif" }}>
            {p.img} {p.name}
          </div>
        ))}
        {productCount > 3 && (
          <div style={{ fontSize: 11, color: 'var(--osmos-fg-subtle)', paddingLeft: 130, fontFamily: "'Open Sans', sans-serif" }}>
            +{productCount - 3} more
          </div>
        )}
      </SectionReview>

      <SectionReview title="Creative / Ads" stepId={4} onEdit={onStepClick}>
        <ReviewRow
          label="Creatives uploaded"
          value={creativeCount > 0 ? `${creativeCount} file${creativeCount !== 1 ? 's' : ''}` : undefined}
        />
        {creativeCount > 0 && campaignData.creatives?.slice(0, 3).map((c, i) => (
          <div key={i} style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', paddingLeft: 130, marginBottom: 2, fontFamily: "'Open Sans', sans-serif" }}>
            {c.format}: {c.name}
          </div>
        ))}
      </SectionReview>

      <SectionReview title="Budget & Schedule" stepId={5} onEdit={onStepClick}>
        {budget ? (
          <>
            <ReviewRow label="Budget type" value={budget.type === 'daily' ? 'Daily' : 'Lifetime'} />
            <ReviewRow
              label={budget.type === 'daily' ? 'Daily budget' : 'Lifetime budget'}
              value={budget.dailyBudget || budget.lifetimeBudget ? `₹${Number(budget.dailyBudget || budget.lifetimeBudget).toLocaleString('en-IN')}` : undefined}
            />
            <ReviewRow label="Start date" value={budget.startDate} />
            <ReviewRow label="End date" value={budget.endDate} />
            <ReviewRow label="Bid strategy" value={budget.bidStrategy} />
            <ReviewRow label="Pacing" value={budget.pacing} />
          </>
        ) : (
          <span style={{ fontSize: 12, color: 'var(--osmos-brand-amber)' }}>⚠ Not configured</span>
        )}
      </SectionReview>

      {/* Footer action row — rendered here, not in the wizard footer for step 6 */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 0 0', borderTop: `1px solid var(--osmos-border)`, marginTop: 8,
      }}>
        <Button variant="ghost" onClick={() => onStepClick?.(5)}>← Back</Button>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button variant="outline">Save as Draft</Button>
          <LaunchButton onLaunchClick={handleLaunch} launchState={launchState} />
        </div>
      </div>
    </div>
  );
}
