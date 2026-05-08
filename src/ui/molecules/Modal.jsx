import { Modal as M } from '@rishikeshjoshi-morpheus/ui';

// Backward-compatible simple-props wrapper around the morpheus compound Modal.
// Old API: <Modal open onClose title footer>{body}</Modal>
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
