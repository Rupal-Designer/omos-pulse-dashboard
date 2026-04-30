import { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Icon, CloseIcon, SearchIcon, CheckIcon, FileIcon,
  ChevronLeftIcon, ChevronRightIcon,
  Button, RadioCard, RadioDot,
} from '../../../ui';

// ── hand-rolled icons ─────────────────────────────────────────────────────────
const SparklesIcon = (props) => (
  <Icon {...props}><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" /></Icon>
);
const CopyIcon = (props) => (
  <Icon {...props}><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></Icon>
);
const ImageIcon = (props) => (
  <Icon {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></Icon>
);
const VideoIcon = (props) => (
  <Icon {...props}><path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" ry="2" /></Icon>
);
const LayersIcon = (props) => (
  <Icon {...props}><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" /><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" /><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" /></Icon>
);
const BookIcon = (props) => (
  <Icon {...props}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></Icon>
);
const SpinnerIcon = ({ size = 24, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 0.8s linear infinite' }}>
    <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

// ── design tokens ─────────────────────────────────────────────────────────────
const FONT      = "'Open Sans', sans-serif";
const BG        = 'var(--osmos-bg)';
const BG_SUBTLE = 'var(--osmos-bg-subtle)';
const BG_MUTED  = 'var(--osmos-bg-muted)';
const BORDER    = 'var(--osmos-border)';
const TEXT      = 'var(--osmos-fg)';
const TEXT_MID  = 'var(--osmos-fg-muted)';
const TEXT_SUB  = 'var(--osmos-fg-subtle)';
const ACCENT    = 'var(--osmos-brand-primary)';
const ACCENT_M  = 'var(--osmos-brand-primary-muted)';
const GREEN     = 'var(--osmos-brand-green)';
const VI        = '#7c3aed';   // AI violet — intentional

// ── static data ───────────────────────────────────────────────────────────────
const TEMPLATES = [
  { id: 'scratch',    label: 'Start from scratch',      description: 'Create a new campaign with default settings',    Icon: FileIcon,      badge: null },
  { id: 'copy',       label: 'Copy existing campaign',  description: 'Duplicate settings from a previous campaign',    Icon: CopyIcon,      badge: null },
  { id: 'ai',         label: 'AI-assisted setup',       description: 'Let AI recommend optimal settings',              Icon: SparklesIcon,  badge: 'Beta' },
];

const EXISTING_CAMPAIGNS = [
  { id: '1', name: 'Keyword Targeting Campaign',  budget: '$300K', status: 'active', performance: 'High' },
  { id: '2', name: 'Email Campaign Automation',   budget: '$250K', status: 'active', performance: 'Medium' },
  { id: '3', name: 'SEO Performance Analysis',    budget: '$350K', status: 'paused', performance: 'High' },
  { id: '4', name: 'Social Media Engagement',     budget: '$150K', status: 'active', performance: 'Low' },
  { id: '5', name: 'Influencer Partnership',      budget: '$450K', status: 'active', performance: 'High' },
  { id: '6', name: 'Pay-Per-Click Advertising',   budget: '$400K', status: 'draft',  performance: 'Medium' },
];

const STATUS_CHIP = {
  active: { bg: 'rgba(27,168,122,0.1)', color: 'var(--osmos-brand-green)' },
  paused: { bg: 'rgba(245,166,35,0.12)', color: 'var(--osmos-brand-amber)' },
  draft:  { bg: 'var(--osmos-bg-muted)', color: 'var(--osmos-fg-subtle)' },
};

// ── helpers ───────────────────────────────────────────────────────────────────
function adTypeSubtitle(adType) {
  if (adType === 'display')  return 'Set up your display advertising campaign';
  if (adType === 'offsite')  return 'Set up your offsite advertising campaign';
  if (adType === 'instore')  return 'Set up your in-store digital advertising campaign';
  return 'Set up your product advertising campaign';
}

function generateAiSuggestions(answers) {
  const budgetMap = { small: { total: '$50,000', daily: '$1,500' }, medium: { total: '$150,000', daily: '$5,000' }, large: { total: '$500,000', daily: '$15,000' }, enterprise: { total: '$1,000,000', daily: '$30,000' } };
  const budget = budgetMap[answers.budgetRange] || budgetMap.medium;
  const goalStrategy = answers.goal === 'sales' ? 'CPA' : answers.goal === 'traffic' ? 'CPC' : 'CPM';
  return {
    budget: budget.total, dailyBudget: budget.daily, bidStrategy: goalStrategy,
    priority: answers.timeline === 'urgent' ? 'High' : 'Standard',
    pacing: answers.timeline === 'urgent' ? 'Accelerated' : 'Even',
    reasoning: `Based on your ${answers.goal} goal and ${answers.budgetRange} budget, I recommend a ${goalStrategy} bidding strategy.`,
  };
}

// ── main component ────────────────────────────────────────────────────────────
export function CreateCampaignModal({ open, onClose, onContinue, adType = 'product' }) {
  const [step, setStep]                   = useState('initial');
  const [name, setName]                   = useState('');
  const [template, setTemplate]           = useState('scratch');
  const [error, setError]                 = useState('');
  const [searchQuery, setSearchQuery]     = useState('');
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [aiAnswers, setAiAnswers]         = useState({ goal: '', audience: '', budgetRange: '', timeline: '' });

  const filteredCampaigns = EXISTING_CAMPAIGNS.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const selectedCampaign  = EXISTING_CAMPAIGNS.find((c) => c.id === selectedCampaignId);

  const handleContinue = () => {
    if (!name.trim()) { setError('Please enter a campaign name'); return; }
    setError('');
    if (template === 'copy')      { setStep('copy-select'); return; }
    if (template === 'ai')        { setStep('ai-questionnaire'); return; }
    onContinue({ name, template, adType });
  };

  const handleCopyCampaign = () => {
    if (!selectedCampaignId) { setError('Please select a campaign to copy'); return; }
    onContinue({ name: name || `${selectedCampaign.name} (Copy)`, template: 'copy', copiedFromId: selectedCampaignId, adType });
  };

  const handleAiGenerate = () => {
    if (!aiAnswers.goal || !aiAnswers.budgetRange || !aiAnswers.timeline) { setError('Please answer all required questions'); return; }
    setStep('ai-generating');
    setTimeout(() => { onContinue({ name, template: 'ai', aiSuggestions: generateAiSuggestions(aiAnswers), adType }); }, 2000);
  };

  const handleClose = () => {
    setName(''); setTemplate('scratch'); setError(''); setStep('initial');
    setSearchQuery(''); setSelectedCampaignId(null);
    setAiAnswers({ goal: '', audience: '', budgetRange: '', timeline: '' });
    onClose();
  };

  const handleBack = () => { setStep('initial'); setError(''); setSelectedCampaignId(null); setSearchQuery(''); };

  if (!open) return null;

  const isInitial = step === 'initial';
  const stepTitle = isInitial ? 'Create New Campaign'
    : step === 'copy-select'      ? 'Select Campaign to Copy'
    : step === 'ai-questionnaire' ? 'AI Campaign Setup'
    : 'Generating Recommendations';
  const stepSubtitle = isInitial ? adTypeSubtitle(adType)
    : step === 'copy-select'      ? 'Choose an existing campaign to use as a template'
    : step === 'ai-questionnaire' ? 'Answer a few questions and let AI configure your campaign'
    : 'Please wait while we analyse your inputs…';

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
      {/* Backdrop */}
      <div onClick={handleClose} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />

      {/* Modal */}
      <div style={{ position: 'relative', backgroundColor: BG, borderRadius: 16, boxShadow: '0 24px 64px rgba(0,0,0,0.18)', width: '100%', maxWidth: 600, margin: '0 16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {step !== 'initial' && step !== 'ai-generating' && (
              <button onClick={handleBack} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BG_MUTED)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                <ChevronLeftIcon size={18} color={TEXT_MID} />
              </button>
            )}
            <div>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: TEXT }}>{stepTitle}</h2>
              <p style={{ margin: '2px 0 0', fontSize: 13, color: TEXT_MID }}>{stepSubtitle}</p>
            </div>
          </div>
          <button onClick={handleClose} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BG_MUTED)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
            <CloseIcon size={18} color={TEXT_MID} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>

          {/* ── Step: initial ── */}
          {step === 'initial' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Campaign name */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 8 }}>
                  Campaign Name <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  placeholder="e.g., Summer Sale 2025, Black Friday Promotion"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(''); }}
                  style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${name ? ACCENT : BORDER}`, borderRadius: 8, fontSize: 14, fontFamily: FONT, color: TEXT, backgroundColor: BG, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' }}
                  onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                  onBlur={(e) => (e.target.style.borderColor = name ? ACCENT : BORDER)}
                />
                <p style={{ margin: '6px 0 0', fontSize: 12, color: TEXT_SUB }}>Choose a descriptive name to easily identify this campaign later</p>
              </div>

              {/* Template selector */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 12 }}>How would you like to start?</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {TEMPLATES.map(({ id, label, description, Icon: TIcon, badge }) => {
                    const sel = template === id;
                    const iconColor = id === 'ai' ? VI : ACCENT;
                    return (
                      <button key={id} onClick={() => setTemplate(id)} style={{
                        display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                        border: `1.5px solid ${sel ? (id === 'ai' ? VI : ACCENT) : BORDER}`,
                        borderRadius: 10, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                        backgroundColor: sel ? (id === 'ai' ? 'rgba(124,58,237,0.06)' : ACCENT_M) : BG,
                        fontFamily: FONT,
                      }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          backgroundColor: sel ? (id === 'ai' ? VI : ACCENT) : BG_MUTED,
                          transition: 'all 0.15s',
                        }}>
                          <TIcon size={19} color={sel ? '#fff' : (id === 'ai' ? VI : TEXT_MID)} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                            <span style={{ fontSize: 14, fontWeight: 600, color: sel ? (id === 'ai' ? VI : ACCENT) : TEXT }}>{label}</span>
                            {badge && <span style={{ padding: '2px 8px', fontSize: 10, fontWeight: 700, backgroundColor: VI, color: '#fff', borderRadius: 999, letterSpacing: '0.03em' }}>{badge}</span>}
                          </div>
                          <p style={{ margin: 0, fontSize: 12, color: TEXT_MID }}>{description}</p>
                        </div>
                        <RadioDot selected={sel} size={18} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── Step: copy-select ── */}
          {step === 'copy-select' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                  <SearchIcon size={16} color={TEXT_SUB} />
                </div>
                <input
                  placeholder="Search campaigns…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px 10px 38px', border: `1.5px solid ${BORDER}`, borderRadius: 8, fontSize: 13, fontFamily: FONT, color: TEXT, backgroundColor: BG, outline: 'none', boxSizing: 'border-box' }}
                  onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                  onBlur={(e) => (e.target.style.borderColor = BORDER)}
                />
              </div>

              <div style={{ maxHeight: 320, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {filteredCampaigns.map((campaign) => {
                  const sel = selectedCampaignId === campaign.id;
                  const chip = STATUS_CHIP[campaign.status] || STATUS_CHIP.draft;
                  return (
                    <button key={campaign.id} onClick={() => { setSelectedCampaignId(campaign.id); setError(''); }} style={{
                      display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                      border: `1.5px solid ${sel ? ACCENT : BORDER}`, borderRadius: 10,
                      cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                      backgroundColor: sel ? ACCENT_M : BG, fontFamily: FONT,
                    }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: sel ? ACCENT : BG_MUTED }}>
                        <CopyIcon size={17} color={sel ? '#fff' : TEXT_MID} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: sel ? ACCENT : TEXT, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{campaign.name}</span>
                          <span style={{ padding: '2px 8px', fontSize: 11, fontWeight: 500, borderRadius: 999, flexShrink: 0, backgroundColor: chip.bg, color: chip.color, textTransform: 'capitalize' }}>{campaign.status}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 16 }}>
                          <span style={{ fontSize: 12, color: TEXT_MID }}>Budget: {campaign.budget}</span>
                          <span style={{ fontSize: 12, color: TEXT_MID }}>Performance: {campaign.performance}</span>
                        </div>
                      </div>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${sel ? ACCENT : BORDER}`, backgroundColor: sel ? ACCENT : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                        {sel && <CheckIcon size={12} color="#fff" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedCampaign && (
                <div style={{ padding: 14, backgroundColor: BG_SUBTLE, borderRadius: 10, border: `1px solid ${BORDER}` }}>
                  <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 600, color: TEXT_SUB, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Preview</p>
                  <p style={{ margin: 0, fontSize: 13, color: TEXT }}>New campaign: <span style={{ fontWeight: 600 }}>{name || `${selectedCampaign.name} (Copy)`}</span></p>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: TEXT_MID }}>All settings, ad groups, and configurations will be duplicated. You can modify them before launching.</p>
                </div>
              )}
            </div>
          )}

          {/* ── Step: ai-questionnaire ── */}
          {step === 'ai-questionnaire' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* AI intro banner */}
              <div style={{ padding: 14, background: `linear-gradient(135deg, rgba(124,58,237,0.08), rgba(99,108,255,0.06))`, borderRadius: 10, border: `1px solid rgba(124,58,237,0.2)`, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <SparklesIcon size={18} color={VI} />
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: VI }}>AI-Powered Recommendations</p>
                  <p style={{ margin: 0, fontSize: 12, color: TEXT_MID }}>Answer a few questions and our AI will suggest optimal campaign settings based on your goals and industry best practices.</p>
                </div>
              </div>

              {/* Goal */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 10 }}>
                  What's your primary goal? <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {[{ id: 'sales', label: 'Increase Sales', desc: 'Drive more purchases' }, { id: 'leads', label: 'Generate Leads', desc: 'Capture customer info' }, { id: 'awareness', label: 'Build Awareness', desc: 'Reach new audiences' }, { id: 'engagement', label: 'Boost Engagement', desc: 'Increase interactions' }].map((g) => (
                    <AiChoiceBtn key={g.id} selected={aiAnswers.goal === g.id} onClick={() => setAiAnswers((p) => ({ ...p, goal: g.id }))} label={g.label} desc={g.desc} />
                  ))}
                </div>
              </div>

              {/* Audience */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 8 }}>Describe your target audience <span style={{ fontWeight: 400, color: TEXT_SUB }}>(optional)</span></label>
                <input
                  placeholder="e.g., Health-conscious millennials, tech enthusiasts, parents with young children"
                  value={aiAnswers.audience}
                  onChange={(e) => setAiAnswers((p) => ({ ...p, audience: e.target.value }))}
                  style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${BORDER}`, borderRadius: 8, fontSize: 13, fontFamily: FONT, color: TEXT, backgroundColor: BG, outline: 'none', boxSizing: 'border-box' }}
                  onFocus={(e) => (e.target.style.borderColor = VI)}
                  onBlur={(e) => (e.target.style.borderColor = BORDER)}
                />
              </div>

              {/* Budget */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 10 }}>
                  Budget range <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                  {[{ id: 'small', label: 'Small', range: '$10K–$50K' }, { id: 'medium', label: 'Medium', range: '$50K–$200K' }, { id: 'large', label: 'Large', range: '$200K–$500K' }, { id: 'enterprise', label: 'Enterprise', range: '$500K+' }].map((b) => (
                    <AiChoiceBtn key={b.id} selected={aiAnswers.budgetRange === b.id} onClick={() => setAiAnswers((p) => ({ ...p, budgetRange: b.id }))} label={b.label} desc={b.range} center />
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 10 }}>
                  How soon do you need results? <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {[{ id: 'urgent', label: 'ASAP', desc: 'Within 1–2 weeks' }, { id: 'normal', label: 'Standard', desc: '1–3 months' }, { id: 'longterm', label: 'Long-term', desc: '3+ months' }].map((t) => (
                    <AiChoiceBtn key={t.id} selected={aiAnswers.timeline === t.id} onClick={() => setAiAnswers((p) => ({ ...p, timeline: t.id }))} label={t.label} desc={t.desc} center />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Step: ai-generating ── */}
          {step === 'ai-generating' && (
            <div style={{ padding: '48px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: `linear-gradient(135deg, ${VI}, ${ACCENT})`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <SpinnerIcon size={30} color="#fff" />
              </div>
              <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600, color: TEXT }}>Generating AI Recommendations</h3>
              <p style={{ margin: 0, fontSize: 13, color: TEXT_MID, textAlign: 'center', maxWidth: 360 }}>Our AI is analysing your requirements and generating optimised campaign settings based on industry best practices.</p>
              <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 280 }}>
                {[['Analysing campaign goal', true], ['Processing budget constraints', true], ['Generating recommendations…', false]].map(([label, done]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {done
                      ? <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><CheckIcon size={10} color="#fff" /></div>
                      : <SpinnerIcon size={18} color={VI} />
                    }
                    <span style={{ fontSize: 13, color: done ? TEXT : TEXT_MID }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ marginTop: 16, padding: '10px 14px', backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8 }}>
              <p style={{ margin: 0, fontSize: 13, color: '#dc2626' }}>{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== 'ai-generating' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, padding: '16px 24px', borderTop: `1px solid ${BORDER}`, backgroundColor: BG_SUBTLE, flexShrink: 0 }}>
            <Button variant="outline" onClick={step === 'initial' ? handleClose : handleBack}>
              {step === 'initial' ? 'Cancel' : 'Back'}
            </Button>
            <Button
              variant="primary"
              onClick={step === 'initial' ? handleContinue : step === 'copy-select' ? handleCopyCampaign : handleAiGenerate}
              style={step === 'ai-questionnaire' ? { backgroundColor: VI } : {}}
            >
              {step === 'initial'          && 'Continue to Setup'}
              {step === 'copy-select'      && 'Copy & Continue'}
              {step === 'ai-questionnaire' && <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}><SparklesIcon size={15} color="#fff" /> Generate Recommendations</span>}
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

// ── sub-component: AI choice button ──────────────────────────────────────────
function AiChoiceBtn({ selected, onClick, label, desc, center }) {
  return (
    <button onClick={onClick} style={{
      padding: '12px 14px', border: `1.5px solid ${selected ? VI : BORDER}`, borderRadius: 10,
      cursor: 'pointer', textAlign: center ? 'center' : 'left', fontFamily: FONT, transition: 'all 0.15s',
      backgroundColor: selected ? 'rgba(124,58,237,0.06)' : BG,
    }}>
      <p style={{ margin: '0 0 3px', fontSize: 13, fontWeight: 600, color: selected ? VI : TEXT }}>{label}</p>
      <p style={{ margin: 0, fontSize: 11, color: TEXT_MID }}>{desc}</p>
    </button>
  );
}
