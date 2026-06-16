import { useState } from 'react';

// ── Design tokens ─────────────────────────────────────────────────────────────
const FONT        = "'Open Sans', sans-serif";
const BLUE        = '#1970E1';
const BLUE_BG     = '#E8F1FC';
const GREY_TEXT   = '#404040';
const GREY_MID    = '#7B7B7B';
const GREY_BORDER = '#DEDEDE';
const GREY_DIS    = '#CCCCCC';
const ERROR_RED   = '#C62828';

// ── Channel definitions ───────────────────────────────────────────────────────
const CHANNELS = [
  {
    id: 'meta', name: 'Meta', subtitle: 'Facebook, Instagram, Messenger, Audience Network',
    count: 5,
    objectives: [
      { id: 'awareness', label: 'Awareness', desc: 'Reach people most likely to remember your ads', recommended: true },
      { id: 'sales',     label: 'Sales',     desc: 'Find people likely to purchase your products' },
      { id: 'traffic',   label: 'Traffic',   desc: 'Send people to a destination like your website' },
    ],
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 2C7.373 2 2 7.373 2 14s5.373 12 12 12 12-5.373 12-12S20.627 2 14 2z" fill="#1877F2"/>
        <path d="M18.89 14c0-2.7-1.95-4.89-4.89-4.89-2.7 0-4.89 2.19-4.89 4.89 0 2.44 1.78 4.47 4.12 4.83V15.5h-1.24V14h1.24v-1.08c0-1.22.73-1.9 1.84-1.9.53 0 1.09.09 1.09.09v1.2h-.61c-.6 0-.79.37-.79.75V14h1.35l-.22 1.5h-1.13v3.33c2.34-.36 4.13-2.39 4.13-4.83z" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'google', name: 'Google', subtitle: 'Search, Display, YouTube, Shopping, Discover',
    count: 4,
    objectives: [
      { id: 'awareness', label: 'Awareness', desc: 'Build awareness and consideration for your brand', recommended: true },
      { id: 'sales',     label: 'Sales',     desc: 'Increase online or in-store sales' },
      { id: 'traffic',   label: 'Traffic',   desc: 'Drive visits to your website' },
    ],
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28">
        <path d="M25.68 14.23c0-.85-.08-1.67-.22-2.46H14v4.65h6.56a5.61 5.61 0 0 1-2.43 3.68v3.06h3.93c2.3-2.12 3.62-5.24 3.62-8.93z" fill="#4285F4"/>
        <path d="M14 26c3.3 0 6.07-1.1 8.09-2.96l-3.93-3.05c-1.09.73-2.49 1.16-4.16 1.16-3.2 0-5.91-2.16-6.88-5.07H3.07v3.15A12 12 0 0 0 14 26z" fill="#34A853"/>
        <path d="M7.12 16.08A7.19 7.19 0 0 1 6.75 14c0-.72.12-1.42.37-2.08V8.77H3.07A12 12 0 0 0 2 14c0 1.94.46 3.77 1.07 5.23l4.05-3.15z" fill="#FBBC05"/>
        <path d="M14 6.85c1.8 0 3.42.62 4.69 1.84l3.52-3.52A11.94 11.94 0 0 0 14 2 12 12 0 0 0 3.07 8.77l4.05 3.15C8.09 9.01 10.8 6.85 14 6.85z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    id: 'tiktok', name: 'TikTok', subtitle: 'In-Feed Ads, Spark Ads, Pangle Network',
    count: 5,
    objectives: [
      { id: 'awareness', label: 'Awareness', desc: 'Show your ads to the maximum number of people', recommended: true },
      { id: 'sales',     label: 'Sales',     desc: 'Drive conversions and sales' },
      { id: 'traffic',   label: 'Traffic',   desc: 'Drive traffic to your website or app' },
    ],
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="6" fill="#010101"/>
        <path d="M19.5 6.5h-2.8v10.2a2.7 2.7 0 0 1-2.7 2.7 2.7 2.7 0 0 1-2.7-2.7 2.7 2.7 0 0 1 2.7-2.7c.27 0 .53.04.77.1V11.3a5.5 5.5 0 0 0-.77-.05 5.5 5.5 0 0 0-5.5 5.5 5.5 5.5 0 0 0 5.5 5.5 5.5 5.5 0 0 0 5.5-5.5V10.4a6.5 6.5 0 0 0 3.8 1.2V8.8a3.8 3.8 0 0 1-3.8-2.3z" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'snapchat', name: 'Snapchat', subtitle: 'Snap Ads, Story Ads, Collection Ads',
    count: 4,
    objectives: [
      { id: 'awareness', label: 'Awareness', desc: 'Increase brand awareness among your audience', recommended: true },
      { id: 'sales',     label: 'Sales',     desc: 'Drive app installs and purchases' },
      { id: 'traffic',   label: 'Traffic',   desc: 'Drive traffic to your website' },
    ],
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="6" fill="#FFFC00"/>
        <path d="M14 6c-1.6 0-4 1.1-4 4.9v1.2l-1 .2c-.2.7.3 1 .8 1.2l.2.1c-.3.5-.8 1.3-1.6 1.6-.2.1-.3.3-.1.5.7.8 2 .7 2.7.8.3.5.7 1 1.6 1.5.4.2.6.5.5.8-.1.2-.3.3-.5.3-.4.1-1.3.1-2.1.6-.1.1-.1.3.1.4 1.1.3 2 .3 2.8.7.3.2.4.5.3.8-.1.2-.3.3-.5.3-.5.1-1 .1-1.4.4 0 .1 0 .2.1.2 2.2.7 4.2.7 6.4 0 .1 0 .1-.1.1-.2-.4-.3-.9-.3-1.4-.4-.2 0-.4-.1-.5-.3-.1-.3 0-.6.3-.8.8-.4 1.7-.4 2.8-.7.2-.1.2-.3.1-.4-.8-.5-1.7-.5-2.1-.6-.2 0-.4-.1-.5-.3-.1-.3.1-.6.5-.8.9-.5 1.3-1 1.6-1.5.7-.1 2 0 2.7-.8.2-.2.1-.4-.1-.5-.8-.3-1.3-1.1-1.6-1.6l.2-.1c.5-.2 1-.5.8-1.2l-1-.2V10.9C18 7.1 15.6 6 14 6z" fill="#191919"/>
      </svg>
    ),
  },
  {
    id: 'youtube', name: 'YouTube', subtitle: 'Skippable Ads, Non-skippable Ads, Bumper Ads',
    count: 4,
    objectives: [
      { id: 'awareness', label: 'Awareness', desc: 'Build awareness with video ads', recommended: true },
      { id: 'sales',     label: 'Sales',     desc: 'Drive online purchases with video ads' },
      { id: 'traffic',   label: 'Traffic',   desc: 'Drive traffic to your website' },
      { id: 'ctv',       label: 'CTV',       desc: 'Reach viewers on smart TVs and streaming devices' },
    ],
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="6" fill="#FF0000"/>
        <path d="M22.5 9.5s-.2-1.5-.9-2.1c-.8-.9-1.8-.9-2.2-.9C17 6.3 14 6.3 14 6.3s-3 0-5.4.2c-.4 0-1.4 0-2.2.9-.7.7-.9 2.1-.9 2.1S5.3 11.1 5.3 12.8v1.5c0 1.7.2 3.3.2 3.3s.2 1.5.9 2.1c.8.9 1.9.8 2.4.9C10.4 20.8 14 20.8 14 20.8s3 0 5.4-.2c.4 0 1.4 0 2.2-.9.7-.7.9-2.1.9-2.1s.2-1.6.2-3.3v-1.5c0-1.7-.2-3.3-.2-3.3zM11.9 16.5V11l5.9 2.8-5.9 2.7z" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'dv360', name: 'DV360', subtitle: 'Display & Video 360, Programmatic Ads',
    count: 3,
    objectives: [
      { id: 'awareness', label: 'Awareness', desc: 'Maximize reach with programmatic advertising', recommended: true },
      { id: 'sales',     label: 'Sales',     desc: 'Drive conversions with display ads' },
      { id: 'traffic',   label: 'Traffic',   desc: 'Drive qualified traffic to your site' },
    ],
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="6" fill="#1A73E8"/>
        <path d="M9 8l7 6-7 6V8z" fill="white"/>
        <path d="M16 8l3 6-3 6V8z" fill="white" opacity="0.6"/>
      </svg>
    ),
  },
];

// ── CreateCampaignModal ───────────────────────────────────────────────────────
export function CreateCampaignModal({ open, onClose, onNext }) {
  const [campaignName, setCampaignName]       = useState('');
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedObjective, setSelectedObj]   = useState(null);
  const [hoverChannel, setHoverChannel]       = useState(null);
  const [hoverObj, setHoverObj]               = useState(null);
  const [nameFocused, setNameFocused]         = useState(false);
  const [hoverClose, setHoverClose]           = useState(false);
  const [hoverNext, setHoverNext]             = useState(false);
  const [confirmClose, setConfirmClose]       = useState(false);
  const [showHint, setShowHint]               = useState(false);

  if (!open) return null;

  const canProceed = !!(selectedChannel && selectedObjective && campaignName.trim());

  const handleNext = () => {
    if (!canProceed) { setShowHint(true); return; }
    onNext?.({ campaignName: campaignName.trim(), channel: selectedChannel, objective: selectedObjective });
  };

  const handleBackdropClick = (e) => {
    if (e.target !== e.currentTarget) return;
    if (campaignName.trim()) {
      setConfirmClose(true);
    } else {
      onClose();
    }
  };

  const handleChannelClick = (id) => {
    setSelectedChannel(id);
    setSelectedObj(null);
    setShowHint(false);
  };

  // Determine which channel to display objectives for (hover preview or selected)
  const displayChannelId = hoverChannel || selectedChannel;
  const displayChannel   = CHANNELS.find(c => c.id === displayChannelId);
  // isPreview: hovering a channel different from the confirmed-selected one
  const isPreview = !!(hoverChannel && hoverChannel !== selectedChannel);

  // Hint text
  let hintText = null;
  if (showHint && !canProceed) {
    if (!campaignName.trim()) hintText = 'Enter a campaign name to continue.';
    else if (!selectedChannel) hintText = 'Select a channel to continue';
    else if (!selectedObjective) hintText = 'Select an objective to continue';
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(64,64,64,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: FONT,
      }}
      onClick={handleBackdropClick}
    >
      <div style={{
        background: 'white', borderRadius: 8,
        width: 580, height: 596,
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px',
          background: BLUE_BG,
          borderBottom: `1px solid ${GREY_BORDER}`,
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: GREY_TEXT }}>
            Create Campaign
          </span>
          <button
            onClick={onClose}
            onMouseEnter={() => setHoverClose(true)}
            onMouseLeave={() => setHoverClose(false)}
            style={{
              border: 'none',
              background: hoverClose ? 'rgba(0,0,0,0.08)' : 'transparent',
              cursor: 'pointer', color: GREY_MID,
              width: 24, height: 24, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.12s', padding: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '16px 20px 0' }}>

          {/* Campaign Name */}
          <div style={{ flexShrink: 0, marginBottom: 14 }}>
            <label style={{
              display: 'flex', alignItems: 'center', gap: 4,
              marginBottom: 6, fontSize: 13, fontWeight: 600, color: GREY_TEXT,
            }}>
              Campaign Name
              <span style={{ color: ERROR_RED }}>*</span>
            </label>
            <input
              value={campaignName}
              onChange={e => { setCampaignName(e.target.value); setShowHint(false); }}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              onKeyDown={e => e.key === 'Enter' && handleNext()}
              placeholder="e.g. Christmas Sale Campaign"
              autoFocus
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '0 12px', height: 38, fontSize: 14, fontFamily: FONT,
                border: (showHint && !campaignName.trim())
                  ? `1.5px solid ${ERROR_RED}`
                  : nameFocused ? `1.5px solid ${BLUE}` : `1px solid ${GREY_BORDER}`,
                borderRadius: 6,
                color: GREY_TEXT, outline: 'none',
                transition: 'border 0.12s',
              }}
            />
            <div style={{
              height: 16, marginTop: 3,
              fontSize: 11, color: ERROR_RED,
              opacity: (showHint && !campaignName.trim()) ? 1 : 0,
              transition: 'opacity 0.15s',
            }}>
              Enter a campaign name to continue.
            </div>
          </div>

          {/* Channel + Objective two-column panel */}
          <div style={{
            flex: 1, display: 'flex',
            border: `1px solid ${GREY_BORDER}`,
            borderRadius: 8, overflow: 'hidden', minHeight: 0,
          }}>

            {/* Left: Channel list */}
            <div style={{
              width: 210, borderRight: `1px solid ${GREY_BORDER}`,
              flexShrink: 0, display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6,
                flexShrink: 0, background: '#FAFAFA',
                borderBottom: `1px solid ${GREY_BORDER}`,
              }}>
                <StepBadge num={1} complete={!!selectedChannel} />
                <span style={{ fontSize: 13, fontWeight: 600, color: selectedChannel ? BLUE : GREY_MID }}>
                  Channel
                </span>
              </div>
              <div style={{
                flex: 1, overflowY: 'auto', padding: '8px 8px',
                display: 'flex', flexDirection: 'column', gap: 6,
                background: '#FAFAFA',
                scrollbarWidth: 'thin', scrollbarColor: '#D0D0D0 transparent',
              }}>
                {CHANNELS.map(ch => {
                  const isSel = selectedChannel === ch.id;
                  const isHov = hoverChannel === ch.id && !isSel;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => handleChannelClick(ch.id)}
                      onMouseEnter={() => setHoverChannel(ch.id)}
                      onMouseLeave={() => setHoverChannel(null)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '7px 10px', borderRadius: 6, cursor: 'pointer',
                        textAlign: 'left', width: '100%',
                        border: isSel ? `1.5px solid ${BLUE}` : isHov ? '1px solid #B8CCEE' : `1px solid ${GREY_BORDER}`,
                        background: isSel ? BLUE_BG : isHov ? '#F0F4FF' : 'white',
                        transition: 'all 0.12s',
                      }}
                    >
                      <RadioDot selected={isSel} />
                      <div style={{ width: 24, height: 24, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                        {ch.logo}
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: GREY_TEXT }}>{ch.name}</div>
                        <div style={{ fontSize: 10, color: GREY_MID }}>{ch.count} objectives</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Objective list */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{
                padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6,
                flexShrink: 0, borderBottom: `1px solid ${GREY_BORDER}`,
              }}>
                <StepBadge num={2} complete={!!selectedObjective} />
                <span style={{ fontSize: 13, fontWeight: 600, color: selectedObjective ? BLUE : GREY_MID }}>
                  Objective
                </span>
              </div>

              {!displayChannel ? (
                // Empty state — no channel hovered or selected
                <div style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: 8, color: GREY_MID, textAlign: 'center', padding: 20,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: '#F5F5F5', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREY_DIS} strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                    </svg>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: GREY_TEXT }}>Choose a Channel</div>
                  <div style={{ fontSize: 11, color: GREY_MID }}>Hover any channel to preview objectives</div>
                </div>
              ) : (
                <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px 8px' }}>
                  {/* Preview confirm banner */}
                  {isPreview && (
                    <div style={{
                      position: 'sticky', top: 0, zIndex: 1,
                      margin: '0 0 8px', padding: '7px 12px',
                      background: BLUE_BG,
                      borderBottom: `1px solid #C2D7F5`,
                      fontSize: 12, color: BLUE,
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 8 16 12 12 16"/><line x1="8" y1="12" x2="16" y2="12"/>
                      </svg>
                      Click <strong style={{ margin: '0 3px' }}>{displayChannel.name}</strong> in the list to confirm
                    </div>
                  )}

                  {/* Channel name + subtitle */}
                  <div style={{ marginBottom: 8, paddingBottom: 8, borderBottom: `1px solid ${GREY_BORDER}`, paddingTop: 8 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: GREY_TEXT }}>{displayChannel.name}</div>
                    <div style={{ fontSize: 11, color: GREY_MID }}>{displayChannel.subtitle}</div>
                  </div>

                  {/* Objectives */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {displayChannel.objectives.map(obj => {
                      const isSel = !isPreview && selectedObjective === obj.id;
                      const isHov = !isPreview && hoverObj === obj.id && !isSel;
                      return (
                        <button
                          key={obj.id}
                          onClick={() => !isPreview && setSelectedObj(obj.id)}
                          onMouseEnter={() => !isPreview && setHoverObj(obj.id)}
                          onMouseLeave={() => setHoverObj(null)}
                          style={{
                            display: 'flex', alignItems: 'flex-start', gap: 8,
                            padding: '7px 8px', borderRadius: 6,
                            cursor: isPreview ? 'not-allowed' : 'pointer',
                            textAlign: 'left', width: '100%',
                            border: isSel
                              ? `1.5px solid ${BLUE}`
                              : isPreview ? `1px solid ${GREY_BORDER}`
                              : isHov ? '1px solid #B8CCEE' : `1px solid ${GREY_BORDER}`,
                            background: isSel ? BLUE_BG
                              : isPreview ? '#F8F8F8'
                              : isHov ? '#F0F4FF' : 'white',
                            opacity: isPreview ? 0.5 : 1,
                            transition: 'all 0.12s',
                          }}
                        >
                          <div style={{ marginTop: 2, flexShrink: 0 }}>
                            <RadioDot selected={isSel} />
                          </div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
                              <span style={{ fontSize: 12, fontWeight: 600, color: GREY_TEXT }}>{obj.label}</span>
                              {obj.recommended && (
                                <span style={{
                                  fontSize: 10, padding: '1px 5px', borderRadius: 4,
                                  border: `1px solid ${BLUE}`, color: BLUE,
                                  background: BLUE_BG, fontWeight: 500,
                                }}>Recommended</span>
                              )}
                            </div>
                            <div style={{ fontSize: 11, color: GREY_MID, marginTop: 1 }}>{obj.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '10px 20px 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10,
          flexShrink: 0,
        }}>
          {/* Inline hint */}
          {showHint && !canProceed && campaignName.trim() && (
            <span style={{ fontSize: 12, color: GREY_MID }}>
              {!selectedChannel ? 'Select a channel to continue' : 'Select an objective to continue'}
            </span>
          )}
          <button
            onClick={handleNext}
            onMouseEnter={() => setHoverNext(true)}
            onMouseLeave={() => setHoverNext(false)}
            style={{
              padding: '9px 28px', borderRadius: 6, border: 'none',
              fontSize: 14, fontWeight: 600, fontFamily: FONT,
              cursor: 'pointer',
              background: hoverNext && canProceed ? '#155abf' : canProceed ? BLUE : GREY_DIS,
              color: 'white', transition: 'background 0.15s',
            }}
          >
            Next
          </button>
        </div>
      </div>

      {/* Confirm-close dialog */}
      {confirmClose && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1001,
            background: 'rgba(64,64,64,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{
            background: 'white', borderRadius: 8,
            padding: 24, width: 340,
            boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
            fontFamily: FONT,
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: GREY_TEXT, marginBottom: 8 }}>
              Discard changes?
            </div>
            <div style={{ fontSize: 13, color: GREY_MID, marginBottom: 20 }}>
              You'll lose the campaign name you entered.
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button
                onClick={() => setConfirmClose(false)}
                style={{
                  padding: '7px 16px', borderRadius: 6,
                  border: `1px solid ${GREY_BORDER}`, background: 'white',
                  fontSize: 13, fontWeight: 600, color: GREY_TEXT, cursor: 'pointer', fontFamily: FONT,
                }}
              >
                Keep editing
              </button>
              <button
                onClick={() => { setConfirmClose(false); onClose(); }}
                style={{
                  padding: '7px 16px', borderRadius: 6,
                  border: 'none', background: ERROR_RED,
                  fontSize: 13, fontWeight: 600, color: 'white', cursor: 'pointer', fontFamily: FONT,
                }}
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Helper components ─────────────────────────────────────────────────────────
function StepBadge({ num, complete }) {
  return (
    <div style={{
      width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: complete ? BLUE : GREY_DIS,
      fontSize: 10, fontWeight: 700, color: 'white',
    }}>
      {complete ? (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ) : num}
    </div>
  );
}

function RadioDot({ selected }) {
  return (
    <div style={{
      width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
      border: selected ? `4px solid ${BLUE}` : `1.5px solid ${GREY_BORDER}`,
      background: 'white', transition: 'all 0.12s', boxSizing: 'border-box',
    }} />
  );
}

function InfoCircleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GREY_MID} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  );
}
