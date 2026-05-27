import React from 'react';
import { Stepper } from '../molecules/Stepper';
import { Button } from '../atoms/Button';

/**
 * OnboardingWizard — Stepper header + content slot + Back/Next navigation.
 * Covers the 4–6 onboarding pages sharing this structure.
 *
 * Usage:
 *   <OnboardingWizard
 *     steps={[{ label: 'Info' }, { label: 'Config' }, { label: 'Review' }]}
 *     current={step}
 *     onBack={handleBack}
 *     onNext={handleNext}
 *     onComplete={handleComplete}
 *     isLoading={submitting}
 *     nextLabel="Continue"
 *     completeLabel="Submit"
 *   >
 *     {stepContent}
 *   </OnboardingWizard>
 *
 * current: 1-indexed active step (matches Stepper convention)
 */
export function OnboardingWizard({
  steps = [],
  current = 1,
  onBack,
  onNext,
  onComplete,
  isLoading = false,
  nextLabel = 'Next',
  completeLabel = 'Submit',
  backLabel = 'Back',
  children,
  style,
}) {
  const isFirst = current === 1;
  const isLast = current === steps.length;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      background: 'var(--osmos-bg)',
      border: '1px solid var(--osmos-border)',
      borderRadius: 10,
      overflow: 'hidden',
      fontFamily: "'Open Sans', sans-serif",
      ...style,
    }}>
      <div style={{
        padding: '20px 28px',
        borderBottom: '1px solid var(--osmos-border)',
        background: 'var(--osmos-bg-subtle)',
      }}>
        <Stepper steps={steps} current={current} />
      </div>

      <div style={{ flex: 1, padding: '28px 28px 0', minHeight: 240 }}>
        {children}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 28px',
        borderTop: '1px solid var(--osmos-border)',
        marginTop: 24,
      }}>
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isFirst || isLoading}
        >
          {backLabel}
        </Button>

        <Button
          variant="primary"
          onClick={isLast ? onComplete : onNext}
          disabled={isLoading}
        >
          {isLoading ? 'Saving…' : isLast ? completeLabel : nextLabel}
        </Button>
      </div>
    </div>
  );
}
