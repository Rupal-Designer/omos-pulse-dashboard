import { Toaster, toaster as morpheusToaster } from '@rishikeshjoshi-morpheus/ui';
import { useCallback } from 'react';

// Renders the global toast container — place once per page (props ignored for backward compat).
export function Toast() {
  return <Toaster />;
}

// Drop-in replacement for the old useToast hook.
// Returns: { toast: {}, showToast(message, type, durationMs) }
export function useToast() {
  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    morpheusToaster.create({ title: message, type, duration });
  }, []);

  return { toast: {}, showToast };
}
