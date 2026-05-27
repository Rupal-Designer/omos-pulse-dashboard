import { Menu } from '@rishikeshjoshi-morpheus/ui';

/**
 * DropdownMenu — triggered dropdown with action items.
 * Figma node: 1947:23250
 *
 * Usage:
 *   <DropdownMenu
 *     trigger={<Button>Actions</Button>}
 *     items={[
 *       { label: 'Edit', icon: <EditIcon />, onClick: handleEdit },
 *       { label: 'Delete', icon: <TrashIcon />, onClick: handleDelete, danger: true },
 *     ]}
 *   />
 */
export function DropdownMenu({ trigger, items = [], placement = 'bottom-end' }) {
  return (
    <Menu.Root positioning={{ placement }}>
      <Menu.Trigger asChild>{trigger}</Menu.Trigger>
      <Menu.Content>
        {items.map((item, i) =>
          item.separator ? (
            <Menu.Separator key={i} />
          ) : (
            <Menu.Item
              key={item.label ?? i}
              value={item.label}
              onClick={item.onClick}
              disabled={item.disabled}
              color={item.danger ? 'var(--osmos-colors-red-500, #ef4444)' : undefined}
            >
              {item.icon && (
                <span style={{ marginRight: 8, display: 'inline-flex', opacity: 0.7 }}>
                  {item.icon}
                </span>
              )}
              {item.label}
            </Menu.Item>
          )
        )}
      </Menu.Content>
    </Menu.Root>
  );
}
