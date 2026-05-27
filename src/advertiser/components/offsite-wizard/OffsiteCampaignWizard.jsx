import { useState } from 'react';
import { Button, CloseIcon, Select } from '../../../ui';
import { VerticalStepperItem } from '../design-system/steppers';
import { CampaignSummarySidebar } from './CampaignSummarySidebar';
import ChannelObjectiveStep from './steps/ChannelObjectiveStep';
import AudienceTargetingStep from './steps/AudienceTargetingStep';
import ProductSelectionStep from './steps/ProductSelectionStep';
import CreativeUploadStep from './steps/CreativeUploadStep';
import BudgetScheduleStep from './steps/BudgetScheduleStep';
import ReviewLaunchStep from './steps/ReviewLaunchStep';

const WIZARD_STEPS = [
  { id: 1, title: 'Channel & Objective', description: 'Choose channels and goals' },
  { id: 2, title: 'Audience & Targeting', description: 'Define your audience' },
  { id: 3, title: 'Product Selection',    description: 'Pick products to promote' },
  { id: 4, title: 'Creative / Ads',       description: 'Upload ad creatives' },
  { id: 5, title: 'Budget & Schedule',    description: 'Set budget and dates' },
  { id: 6, title: 'Review & Launch',      description: 'Review and go live' },
];

const BRAND_PROFILES = [
  { value: 'osmos-apparel',    label: 'Osmos Apparel' },
  { value: 'osmos-electronics', label: 'Osmos Electronics' },
  { value: 'osmos-beauty',     label: 'Osmos Beauty' },
];

export default function OffsiteCampaignWizard({ onClose, onLaunch }) {
  const [currentStep, setCurrentStep]     = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [brandProfile, setBrandProfile]   = useState(BRAND_PROFILES[0].value);
  const [campaignData, setCampaignData]   = useState({
    channels: [],       // [{ channel, objective }]
    audience: null,     // { ageMin, ageMax, gender, location, customAudiences, pixelEvents }
    selectedProducts: [],
    creatives: [],
    budget: null,       // { type, dailyBudget, startDate, endDate, bidStrategy, pacing }
    campaignName: '',
  });

  function updateCampaignData(partial) {
    setCampaignData(prev => ({ ...prev, ...partial }));
  }

  function markStepComplete(stepId) {
    setCompletedSteps(prev => prev.includes(stepId) ? prev : [...prev, stepId]);
  }

  function handleNext() {
    markStepComplete(currentStep);
    setCurrentStep(s => Math.min(s + 1, 6));
  }

  function handleBack() {
    setCurrentStep(s => Math.max(s - 1, 1));
  }

  function handleStepClick(stepId) {
    if (stepId === currentStep) return;
    if (completedSteps.includes(stepId) || stepId < currentStep) {
      setCurrentStep(stepId);
    }
  }

  function canAdvance() {
    switch (currentStep) {
      case 1: return campaignData.channels.length > 0 && campaignData.channels.every(c => c.objective);
      case 2: return !!campaignData.audience?.location;
      case 3: return campaignData.selectedProducts.length > 0;
      case 4: return campaignData.creatives.length > 0;
      case 5: return !!campaignData.budget?.dailyBudget;
      default: return true;
    }
  }

  const STEP_COMPONENTS = {
    1: <ChannelObjectiveStep campaignData={campaignData} onChange={updateCampaignData} />,
    2: <AudienceTargetingStep campaignData={campaignData} onChange={updateCampaignData} />,
    3: <ProductSelectionStep campaignData={campaignData} onChange={updateCampaignData} />,
    4: <CreativeUploadStep campaignData={campaignData} onChange={updateCampaignData} />,
    5: <BudgetScheduleStep campaignData={campaignData} onChange={updateCampaignData} />,
    6: <ReviewLaunchStep campaignData={campaignData} onChange={updateCampaignData} onStepClick={handleStepClick} onLaunch={onLaunch} />,
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', flexDirection: 'column',
      background: 'var(--osmos-bg)', fontFamily: "'Open Sans', sans-serif",
    }}>
      {/* ── Header ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 24px', borderBottom: `1px solid var(--osmos-border)`,
        background: 'var(--osmos-bg)', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--osmos-fg)', margin: 0 }}>
            Create Campaign
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--osmos-fg-muted)' }}>Brand Profile:</span>
            <Select
              value={brandProfile}
              onChange={e => setBrandProfile(e.target.value)}
              options={BRAND_PROFILES}
              style={{ fontSize: 12, minWidth: 160 }}
            />
          </div>
        </div>
        <button
          onClick={onClose}
          style={{ padding: 8, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--osmos-fg-muted)', display: 'flex' }}
          aria-label="Close wizard"
        >
          <CloseIcon size={20} />
        </button>
      </div>

      {/* ── Body ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left sidebar — stepper + summary */}
        <div style={{
          width: 260, flexShrink: 0, borderRight: `1px solid var(--osmos-border)`,
          background: 'var(--osmos-bg-subtle)', overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: 0,
        }}>
          {/* Stepper */}
          <div style={{ padding: '20px 16px 16px' }}>
            <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--osmos-fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>
              Steps
            </p>
            {WIZARD_STEPS.map(step => {
              const isCompleted = completedSteps.includes(step.id);
              const isClickable = isCompleted || step.id < currentStep;
              return (
                <VerticalStepperItem
                  key={step.id}
                  number={step.id}
                  title={step.title}
                  description={step.description}
                  isActive={currentStep === step.id}
                  isCompleted={isCompleted}
                  onClick={() => handleStepClick(step.id)}
                  disabled={!isClickable && step.id !== currentStep}
                />
              );
            })}
          </div>

          {/* Divider */}
          <div style={{ borderTop: `1px solid var(--osmos-border)`, margin: '0 16px' }} />

          {/* Campaign summary */}
          <div style={{ padding: '16px' }}>
            <CampaignSummarySidebar
              campaignData={campaignData}
              completedSteps={completedSteps}
              onStepClick={handleStepClick}
            />
          </div>
        </div>

        {/* Main content area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Step content — scrollable */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
            {STEP_COMPONENTS[currentStep]}
          </div>

          {/* ── Footer ── */}
          {currentStep < 6 && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 32px', borderTop: `1px solid var(--osmos-border)`,
              background: 'var(--osmos-bg)', flexShrink: 0,
            }}>
              <div style={{ display: 'flex', gap: 10 }}>
                {currentStep > 1 && (
                  <Button variant="ghost" onClick={handleBack}>← Back</Button>
                )}
                <Button variant="outline" onClick={onClose}>Save Draft</Button>
              </div>
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!canAdvance()}
              >
                Next →
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
