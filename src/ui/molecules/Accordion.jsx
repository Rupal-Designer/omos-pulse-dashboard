import { Accordion as A } from '@rishikeshjoshi-morpheus/ui';

/**
 * Accordion — collapsible disclosure panels.
 * Figma node: 5684:1685
 *
 * Usage (items API):
 *   <Accordion items={[{ id: 'a', label: 'Section A', content: <p>...</p> }]} />
 *
 * Usage (compound, for custom content):
 *   <Accordion.Root multiple>
 *     <Accordion.Item value="a">
 *       <Accordion.Trigger>Section A</Accordion.Trigger>
 *       <Accordion.Content>...</Accordion.Content>
 *     </Accordion.Item>
 *   </Accordion.Root>
 */
export function Accordion({ items = [], multiple = false, defaultOpen = [], style }) {
  return (
    <A multiple={multiple} defaultValue={defaultOpen} style={style}>
      {items.map((item) => (
        <A.Item key={item.id} value={item.id}>
          <A.ItemTrigger>{item.label}</A.ItemTrigger>
          <A.ItemContent>
            <A.ItemBody>{item.content ?? item.children}</A.ItemBody>
          </A.ItemContent>
        </A.Item>
      ))}
    </A>
  );
}

// Expose compound API for advanced usage
Accordion.Root    = A;
Accordion.Item    = A.Item;
Accordion.Trigger = A.ItemTrigger;
Accordion.Content = A.ItemContent;
Accordion.Body    = A.ItemBody;
