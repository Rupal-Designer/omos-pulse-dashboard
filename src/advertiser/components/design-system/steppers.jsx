"use client";
import { Check } from "lucide-react";

// ============================================================================
// VERTICAL STEPPER ITEM
// ============================================================================

export function VerticalStepperItem({
  number,
  title,
  description,
  isActive,
  isCompleted,
  onClick,
  disabled,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-start gap-3 p-3 rounded-lg transition-colors text-left ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      style={{
        backgroundColor: isActive ? "var(--screen-bg)" : "transparent",
        borderWidth: isActive ? "1px" : "0",
        borderColor: isActive ? "rgba(37, 99, 235, 0.2)" : "transparent",
      }}
      onMouseEnter={(e) => {
        if (!disabled && !isActive)
          e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.02)";
      }}
      onMouseLeave={(e) => {
        if (!disabled && !isActive)
          e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
        style={{
          backgroundColor: isActive
            ? "var(--blue-primary)"
            : isCompleted
              ? "var(--success-primary)"
              : "var(--surface-2)",
          color: isActive || isCompleted ? "white" : "var(--text-secondary)",
        }}
      >
        {isCompleted ? <Check size={16} /> : number}
      </div>
      <div className="flex-1">
        <p
          className="text-sm font-medium"
          style={{
            color: isActive
              ? "var(--blue-primary)"
              : isCompleted
                ? "var(--text-primary)"
                : "var(--text-secondary)",
          }}
        >
          {title}
        </p>
        {description && (
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            {description}
          </p>
        )}
      </div>
    </button>
  );
}

// ============================================================================
// VERTICAL STEPPER
// ============================================================================

export function VerticalStepper({
  steps,
  currentStep,
  onStepClick,
  className = "",
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {steps.map((step) => (
        <VerticalStepperItem
          key={step.id}
          number={step.id}
          title={step.title}
          description={step.description}
          isActive={currentStep === step.id}
          isCompleted={currentStep > step.id}
          onClick={() => onStepClick?.(step.id)}
          disabled={step.id > currentStep}
        />
      ))}
    </div>
  );
}

// ============================================================================
// HORIZONTAL STEPPER ITEM
// ============================================================================

export function HorizontalStepperItem({
  number,
  title,
  isActive,
  isCompleted,
  isLast,
  onClick,
}) {
  return (
    <div className="flex items-center flex-1">
      <button
        onClick={onClick}
        className="flex items-center gap-3 cursor-pointer transition-colors"
        disabled={!isCompleted && !isActive}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
          style={{
            backgroundColor: isActive
              ? "var(--blue-primary)"
              : isCompleted
                ? "var(--success-primary)"
                : "var(--surface-2)",
            color: isActive || isCompleted ? "white" : "var(--text-secondary)",
          }}
        >
          {isCompleted ? <Check size={16} /> : number}
        </div>
        <span
          className="text-sm font-medium"
          style={{
            color: isActive
              ? "var(--blue-primary)"
              : isCompleted
                ? "var(--text-primary)"
                : "var(--text-secondary)",
          }}
        >
          {title}
        </span>
      </button>
      {!isLast && (
        <div
          className="flex-1 h-px mx-4"
          style={{
            backgroundColor: isCompleted
              ? "var(--success-primary)"
              : "var(--stroke)",
          }}
        />
      )}
    </div>
  );
}

// ============================================================================
// HORIZONTAL STEPPER
// ============================================================================

export function HorizontalStepper({
  steps,
  currentStep,
  onStepClick,
  className = "",
}) {
  return (
    <div className={`flex items-center ${className}`}>
      {steps.map((step, index) => (
        <HorizontalStepperItem
          key={step.id}
          number={step.id}
          title={step.title}
          isActive={currentStep === step.id}
          isCompleted={currentStep > step.id}
          isLast={index === steps.length - 1}
          onClick={() => onStepClick?.(step.id)}
        />
      ))}
    </div>
  );
}
