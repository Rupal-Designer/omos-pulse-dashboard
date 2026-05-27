---
type: component
layer: pattern
name: OnboardingWizard
source-file: src/ui/patterns/OnboardingWizard.jsx
figma-node: none
last-updated: 2026-05-25T06:30:06Z
tags: [pattern, ui-component]
---

# OnboardingWizard

Stepper header + content slot + Back / Next / Submit navigation footer in a bordered card shell; covers the 4–6 onboarding flows sharing this structure.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| steps | `{ label: string }[]` | `[]` | Step definitions forwarded to the `Stepper` component |
| current | number | `1` | 1-indexed active step number |
| onBack | () => void | — | Called when the Back button is clicked |
| onNext | () => void | — | Called when the Next button is clicked (not on the last step) |
| onComplete | () => void | — | Called when the Submit button is clicked (last step only) |
| isLoading | boolean | `false` | Disables both nav buttons; submit label becomes `'Saving…'` |
| nextLabel | string | `'Next'` | Label for the forward button on non-final steps |
| completeLabel | string | `'Submit'` | Label for the forward button on the final step |
| backLabel | string | `'Back'` | Label for the back button |
| children | ReactNode | — | Step content rendered in the main body slot |
| style | CSSProperties | — | Applied to the root container |

---

## Usage

```jsx
import { OnboardingWizard } from '../../ui';

const STEPS = [{ label: 'Info' }, { label: 'Config' }, { label: 'Review' }];

<OnboardingWizard
  steps={STEPS}
  current={step}
  onBack={handleBack}
  onNext={handleNext}
  onComplete={handleComplete}
  isLoading={submitting}
  nextLabel="Continue"
  completeLabel="Submit"
>
  {step === 1 && <StepOneForm />}
  {step === 2 && <StepTwoForm />}
  {step === 3 && <ReviewPanel />}
</OnboardingWizard>
```

---

## Notes

- `current` is 1-indexed to match the `Stepper` component convention.
- The Back button is disabled (`disabled`) when `current === 1` or `isLoading` is true.
- The forward button renders `onComplete` when `current === steps.length`, otherwise `onNext`.
- The stepper header area has a `bg-subtle` background separated from the body by a `1px var(--osmos-border)` bottom border.
- Minimum body height is `240px`; the content area has `28px` horizontal padding.
- Composed from: [[Components/molecules/Stepper]], [[Components/atoms/Button]].
