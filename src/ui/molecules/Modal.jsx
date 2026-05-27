import { Modal as M } from '@rishikeshjoshi-morpheus/ui';

/**
 * Backward-compatible simple-props wrapper around the morpheus compound Modal.
 * Old API: <Modal open onClose title footer>{body}</Modal>
 *
 * WCAG 2.4.3 — Focus order / focus trap:
 *   The Morpheus Modal is built on Ark UI's Dialog primitive, which internally:
 *   - Traps focus within Modal.Content when open (Tab / Shift+Tab cycle within the dialog)
 *   - Returns focus to the previously focused element (document.activeElement before open)
 *     automatically on close
 *   - Renders with role="dialog" aria-modal="true" on the Content element
 *   - Modal.Title is linked via aria-labelledby on the dialog element automatically
 *   No manual focus-trap implementation is required.
 */
export function Modal({ open, onClose, title, children, footer }) {
  return (
    <M open={open} onClose={onClose}>
      <M.Content>
        <M.Header>
          <M.Title>{title}</M.Title>
          <M.CloseTrigger />
        </M.Header>
        <M.Body>{children}</M.Body>
        {footer && <M.Footer>{footer}</M.Footer>}
      </M.Content>
    </M>
  );
}
