import React from 'react';
import { EyeIcon, Icon } from '../../ui';
import { Button } from '../../ui';
import { Toast, useToast } from '../../ui';

/* ─── Verbatim data from Figma node 6:76271 ───────────────────────── */
/* NOTE: Column headers ("Field") and row data are Figma placeholder   */
/* values. Real field names / values should replace these when known.  */
const ROWS = [
  { id: 1, field: 'Anand Takur',    value: 'Anand Takur'    },
  { id: 2, field: 'Aarya',          value: 'Aarya'          },
  { id: 3, field: 'Abhishek',       value: 'Abhishek'       },
  { id: 4, field: 'Abhishek Nandi', value: 'Abhishek Nandi' },
  { id: 5, field: 'Adina Campeanu', value: 'Adina Campeanu' },
  { id: 6, field: 'Aditya',         value: 'Aditya'         },
];

const FONT = "'Open Sans', sans-serif";

function CopyIcon({ size = 14, color = 'currentColor' }) {
  return (
    <Icon size={size} color={color}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </Icon>
  );
}

export default function SetupDetailsPage() {
  const { toast, showToast } = useToast();

  function handleCopy(value) {
    navigator.clipboard?.writeText(value).catch(() => {});
    showToast('Copied to clipboard');
  }

  return (
    <div style={{ padding: '20px 24px', fontFamily: FONT, background: 'var(--osmos-bg-subtle)', minHeight: '100vh' }}>
      <Toast {...toast} />

      <div style={{
        background: 'var(--osmos-bg)',
        border: '1px solid var(--osmos-border)',
        borderRadius: 8,
        overflow: 'hidden',
      }}>
        {/* Section header */}
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid var(--osmos-border)',
          background: 'var(--osmos-bg-subtle)',
        }}>
          <span style={{
            fontSize: 11, fontWeight: 700,
            color: 'var(--osmos-fg-muted)',
            textTransform: 'uppercase', letterSpacing: '0.07em',
          }}>
            Merchant Onboard Guide
          </span>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--osmos-bg-subtle)', borderBottom: '1px solid var(--osmos-border)' }}>
                <th style={TH}>Field</th>
                <th style={TH}>Field</th>
                <th style={{ ...TH, width: 80, textAlign: 'right' }} />
              </tr>
            </thead>
            <tbody>
              {ROWS.map(row => (
                <tr
                  key={row.id}
                  style={{ borderBottom: '1px solid var(--osmos-border)', background: 'var(--osmos-bg)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--osmos-bg-subtle)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--osmos-bg)'}
                >
                  <td style={TD}>{row.field}</td>
                  <td style={TD}>{row.value}</td>
                  <td style={{ ...TD, textAlign: 'right' }}>
                    <span style={{ display: 'inline-flex', gap: 6 }}>
                      <Button variant="icon" onClick={() => showToast(`Viewing: ${row.value}`)}>
                        <EyeIcon size={14} color="var(--osmos-fg-muted)" />
                      </Button>
                      <Button variant="icon" onClick={() => handleCopy(row.value)}>
                        <CopyIcon size={14} color="var(--osmos-fg-muted)" />
                      </Button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const TH = {
  padding: '10px 16px',
  textAlign: 'left',
  fontWeight: 600,
  color: 'var(--osmos-fg-muted)',
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  whiteSpace: 'nowrap',
};

const TD = {
  padding: '10px 16px',
  color: 'var(--osmos-fg)',
  fontSize: 13,
  fontFamily: "'Open Sans', sans-serif",
};
