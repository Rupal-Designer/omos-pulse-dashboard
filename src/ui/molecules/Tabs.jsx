import { Tabs as T } from '@rishikeshjoshi-morpheus/ui';

/**
 * Osmos Tabs — wraps Morpheus Tabs with a flat items-array API.
 *
 * Supports horizontal (default) and vertical orientation.
 * Figma node: 69:12409  |  Vertical key: 12e11bf1a1297af37490a74e128e4e2d283d4fba
 *
 * Usage:
 *   <Tabs value={tab} onValueChange={setTab} items={[{id:'a',label:'Overview'}]} />
 *
 * Vertical:
 *   <Tabs orientation="vertical" value={tab} onValueChange={setTab} items={[...]} />
 */
export function Tabs({
  value,
  onValueChange,
  items = [],
  variant = 'line',    // 'line' | 'pill'
  orientation = 'horizontal',
  children,            // optional: render tab content inline via Tabs.Content pattern
  style,
}) {
  const isVertical = orientation === 'vertical';

  return (
    <T
      value={value}
      onValueChange={(e) => onValueChange?.(e.value)}
      variant={variant}
      orientation={orientation}
      style={{
        display: isVertical ? 'flex' : undefined,
        flexDirection: isVertical ? 'row' : undefined,
        gap: isVertical ? 0 : undefined,
        ...style,
      }}
    >
      <T.List
        style={{
          flexDirection: isVertical ? 'column' : undefined,
          borderRight: isVertical ? '1px solid var(--osmos-border)' : undefined,
          borderBottom: isVertical ? 'none' : undefined,
          minWidth: isVertical ? 160 : undefined,
        }}
      >
        {items.map((item) => (
          <T.Trigger key={item.id} value={item.id} style={{ justifyContent: isVertical ? 'flex-start' : undefined }}>
            {item.icon && <span style={{ marginRight: 6, display: 'inline-flex' }}>{item.icon}</span>}
            {item.label}
          </T.Trigger>
        ))}
      </T.List>

      {/* If children are passed (T.Content blocks), render them */}
      {children && (
        <div style={{ flex: 1, padding: isVertical ? '0 0 0 24px' : undefined }}>
          {children}
        </div>
      )}
    </T>
  );
}

// Pass-through sub-components for compound usage
Tabs.Content = T.Content;
