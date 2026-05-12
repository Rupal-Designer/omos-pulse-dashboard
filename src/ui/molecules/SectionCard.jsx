import { Card } from '@rishikeshjoshi-morpheus/ui';

// Backward-compatible wrapper around the morpheus compound Card.
// Old API: <SectionCard title titleRight headerSize bodyBg bodyPad style>{body}</SectionCard>
export function SectionCard({ title, titleRight, children, style }) {
  return (
    <Card style={style}>
      {title !== undefined && (
        <Card.Header display="flex" alignItems="center" justifyContent="space-between">
          <Card.Title>{title}</Card.Title>
          {titleRight && <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{titleRight}</div>}
        </Card.Header>
      )}
      <Card.Body>{children}</Card.Body>
    </Card>
  );
}
