import { useState } from 'react';
import { PlusIcon, CloseIcon } from '../../ui';

// ── Design tokens ────────────────────────────────────────────────────────────
const FONT      = "'Open Sans', sans-serif";
const BG        = 'var(--osmos-bg)';
const BG_SUBTLE = 'var(--osmos-bg-subtle)';
const BORDER    = 'var(--osmos-border)';
const TEXT      = 'var(--osmos-fg)';
const TEXT_MID  = 'var(--osmos-fg-muted)';
const ACCENT    = 'var(--osmos-brand-primary)';
const ACCENT_M  = 'var(--osmos-brand-primary-muted)';

// ── Defaults ─────────────────────────────────────────────────────────────────
const defaultOperators = [
  { value: 'equals',      label: 'equals (=)' },
  { value: 'notEquals',   label: 'not equals (≠)' },
  { value: 'greaterThan', label: 'greater than (>)' },
  { value: 'lessThan',    label: 'less than (<)' },
  { value: 'contains',    label: 'contains' },
];

const SELECT_STYLE = {
  padding: '8px 12px', border: `1px solid ${BORDER}`, borderRadius: 8,
  fontSize: 13, outline: 'none', color: TEXT, background: BG, fontFamily: FONT,
  cursor: 'pointer',
};

// ── FilterBuilder ─────────────────────────────────────────────────────────────
export function FilterBuilder({
  onFiltersChange,
  filterFields,
  operators = defaultOperators,
}) {
  const [filterRows,         setFilterRows]         = useState([]);
  const [activeFilterIndex,  setActiveFilterIndex]  = useState(null);
  const [showFilterBuilder,  setShowFilterBuilder]  = useState(false);

  const handleAddFilter = (index) => {
    const newRows = [...filterRows];
    newRows.splice(index + 1, 0, { field: '', operator: 'equals', value: '' });
    setFilterRows(newRows);
    setActiveFilterIndex(index + 1);
  };

  const handleRemoveFilter = (index) => {
    const newRows = filterRows.filter((_, i) => i !== index);
    setFilterRows(newRows);
    onFiltersChange?.(newRows.filter((f) => f.field && f.value));
  };

  const handleFieldChange    = (index, field)    => { const r = [...filterRows]; r[index].field    = field;    setFilterRows(r); };
  const handleOperatorChange = (index, operator) => { const r = [...filterRows]; r[index].operator = operator; setFilterRows(r); };
  const handleValueChange    = (index, value)    => { const r = [...filterRows]; r[index].value    = value;    setFilterRows(r); };

  const handleApplyFilter = () => {
    onFiltersChange?.(filterRows.filter((f) => f.field && f.value));
    setShowFilterBuilder(false);
  };

  const activeFilters = filterRows.filter((f) => f.field && f.value);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: FONT }}>
      {/* ── Builder panel ── */}
      {showFilterBuilder && (
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 12,
          padding: 16, borderRadius: 8, border: `1px solid ${BORDER}`,
          backgroundColor: BG_SUBTLE,
        }}>
          {filterRows.map((filter, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* "Add a Filter" pill toggle for this row */}
              <button
                onClick={() => setActiveFilterIndex(activeFilterIndex === index ? null : index)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 16px', borderRadius: 999, cursor: 'pointer',
                  border: `1px solid ${activeFilterIndex === index ? ACCENT : BORDER}`,
                  backgroundColor: BG, fontFamily: FONT, fontSize: 13, color: TEXT,
                  transition: 'all 0.15s',
                }}
              >
                <PlusIcon size={14} color={TEXT_MID} />
                Add a Filter
              </button>

              {/* Expanded row */}
              {activeFilterIndex === index && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: 12, borderRadius: 8,
                  border: `1px solid ${BORDER}`, backgroundColor: BG,
                }}>
                  <select
                    value={filter.field}
                    onChange={(e) => handleFieldChange(index, e.target.value)}
                    style={{ ...SELECT_STYLE, flex: 1 }}
                  >
                    <option value="">Select field</option>
                    {filterFields.map((f) => (
                      <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                  </select>

                  <select
                    value={filter.operator}
                    onChange={(e) => handleOperatorChange(index, e.target.value)}
                    style={SELECT_STYLE}
                  >
                    {operators.map((op) => (
                      <option key={op.value} value={op.value}>{op.label}</option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={filter.value}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    placeholder="Enter value"
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyFilter()}
                    style={{ ...SELECT_STYLE, flex: 1 }}
                  />

                  <button
                    onClick={handleApplyFilter}
                    style={{
                      padding: '8px 16px', borderRadius: 8, border: 'none',
                      backgroundColor: ACCENT, color: '#fff', fontSize: 13,
                      fontWeight: 500, cursor: 'pointer', fontFamily: FONT,
                      transition: 'opacity 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Empty state — first "Add a Filter" */}
          {filterRows.length === 0 && (
            <button
              onClick={() => {
                setFilterRows([{ field: '', operator: 'equals', value: '' }]);
                setActiveFilterIndex(0);
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 16px', borderRadius: 999, cursor: 'pointer',
                border: `1px solid ${BORDER}`, backgroundColor: BG,
                fontFamily: FONT, fontSize: 13, color: TEXT_MID,
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <PlusIcon size={14} color={TEXT_MID} />
              Add a Filter
            </button>
          )}
        </div>
      )}

      {/* ── Toggle button (when panel is closed) ── */}
      {!showFilterBuilder && (
        <button
          onClick={() => setShowFilterBuilder(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            border: 'none', background: 'transparent',
            fontSize: 13, color: TEXT_MID, cursor: 'pointer', fontFamily: FONT,
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <PlusIcon size={14} color={TEXT_MID} />
          Add a Filter
        </button>
      )}

      {/* ── Active filter chips ── */}
      {activeFilters.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          {activeFilters.map((filter, index) => (
            <div
              key={index}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 12px', borderRadius: 999,
                border: `1px solid ${ACCENT_M}`,
                backgroundColor: ACCENT_M,
                color: ACCENT, fontSize: 13,
              }}
            >
              <span>
                {filterFields.find((f) => f.value === filter.field)?.label || filter.field}
                {' '}{operators.find((o) => o.value === filter.operator)?.label || filter.operator}
                {' '}{filter.value}
              </span>
              <button
                onClick={() => handleRemoveFilter(index)}
                style={{
                  border: 'none', background: 'transparent',
                  color: ACCENT, cursor: 'pointer', padding: 0,
                  display: 'flex', alignItems: 'center',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                <CloseIcon size={14} color={ACCENT} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
