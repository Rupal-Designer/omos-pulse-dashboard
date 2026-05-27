import { Popover as P } from '@rishikeshjoshi-morpheus/ui';

/**
 * Popover — info popup anchored to a trigger element.
 * Figma node: 1:2394
 *
 * Usage:
 *   <Popover trigger={<Button>Info</Button>} content={<p>Details here</p>} />
 *
 * With footer:
 *   <Popover trigger={<InfoIcon />} title="Help" content={<p>...</p>} footer={<Button>Got it</Button>} />
 */
export function Popover({ trigger, title, content, footer, placement = 'bottom', width = 280 }) {
  return (
    <P.Root lazyMount unmountOnExit positioning={{ placement }}>
      <P.Trigger asChild>{trigger}</P.Trigger>
      <P.Content style={{ width, maxWidth: '90vw' }}>
        {title && <P.Title style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>{title}</P.Title>}
        <P.Body>{content}</P.Body>
        {footer && (
          <P.Footer style={{ borderTop: '1px solid var(--osmos-border)', paddingTop: 8, marginTop: 8 }}>
            {footer}
          </P.Footer>
        )}
      </P.Content>
    </P.Root>
  );
}
