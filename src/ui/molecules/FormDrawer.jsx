import { Drawer as D } from '@rishikeshjoshi-morpheus/ui';
import { Button } from '../atoms/Button';

/**
 * FormDrawer — right-side slide panel pre-wired with a sticky Header + scrollable
 * Body + fixed Footer (Cancel / Submit).
 *
 * Replaces the 15+ inline drawer implementations that all repeat the same
 * overlay + panel + field layout structure.
 *
 * Usage:
 *   <FormDrawer
 *     open={open}
 *     onClose={() => setOpen(false)}
 *     title="Create Advertiser"
 *     onSubmit={handleSubmit}
 *     submitLabel="Create"
 *     isLoading={saving}
 *     width={480}
 *   >
 *     <FormField label="Name" required><Input /></FormField>
 *   </FormDrawer>
 */
export function FormDrawer({
  open,
  onClose,
  title,
  subtitle,
  onSubmit,
  submitLabel = 'Save',
  isLoading = false,
  width = 460,
  children,
}) {
  return (
    <D open={open} onClose={onClose}>
      <D.Content style={{ width, maxWidth: '100vw' }}>
        <D.Header>
          <D.Title>{title}</D.Title>
          {subtitle && <D.Description>{subtitle}</D.Description>}
          <D.CloseTrigger />
        </D.Header>

        <D.Body style={{ overflowY: 'auto', padding: '20px 24px' }}>
          {/* Disable pointer events while saving */}
          <div style={{ pointerEvents: isLoading ? 'none' : undefined, opacity: isLoading ? 0.6 : undefined }}>
            {children}
          </div>
        </D.Body>

        <D.Footer style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 8,
          padding: '12px 24px',
          borderTop: '1px solid var(--osmos-border)',
        }}>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Saving…' : submitLabel}
          </Button>
        </D.Footer>
      </D.Content>
    </D>
  );
}
