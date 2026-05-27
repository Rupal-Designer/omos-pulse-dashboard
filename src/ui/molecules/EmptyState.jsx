import { EmptyState as ES } from '@rishikeshjoshi-morpheus/ui';

// Backward-compatible wrapper around the morpheus compound EmptyState.
// Old API: <EmptyState icon message iconBg iconColor paddingY>{cta}</EmptyState>
export function EmptyState({ icon, message, children }) {
  return (
    <ES.Root>
      <ES.Content>
        {icon && <ES.Indicator>{icon}</ES.Indicator>}
        {message && <ES.Description>{message}</ES.Description>}
        {children}
      </ES.Content>
    </ES.Root>
  );
}
