import { Drawer as D } from '@rishikeshjoshi-morpheus/ui';

// Backward-compatible simple-props wrapper around the morpheus compound Drawer.
// Old API: <Drawer open onClose title subtitle footer>{body}</Drawer>
export function Drawer({ open, onClose, title, subtitle, children, footer }) {
  return (
    <D open={open} onClose={onClose}>
      <D.Content>
        <D.Header>
          <D.Title>{title}</D.Title>
          {subtitle && <D.Description>{subtitle}</D.Description>}
          <D.CloseTrigger />
        </D.Header>
        <D.Body>{children}</D.Body>
        {footer && <D.Footer>{footer}</D.Footer>}
      </D.Content>
    </D>
  );
}
