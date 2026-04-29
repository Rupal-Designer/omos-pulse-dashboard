import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../atoms/Icon';
import { Button } from '../atoms/Button';

const FONT = "'Open Sans', sans-serif";

/**
 * Pagination — "Showing X–Y of Z" label + Prev / Next buttons.
 * total: number of total items
 * page: current page (1-indexed)
 * perPage: items per page (default 20)
 * onChange: (newPage: number) => void
 * entityLabel: e.g. "records", "segments" (default: "records")
 */
export function Pagination({ total, page, perPage = 20, onChange, entityLabel = 'records' }) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const from = total === 0 ? 0 : (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 16px',
      borderTop: '1px solid var(--osmos-border)',
    }}>
      <span style={{ fontSize: 12, color: 'var(--osmos-fg-subtle)', fontFamily: FONT }}>
        {total === 0
          ? `No ${entityLabel}`
          : `Showing ${from}–${to} of ${total} ${entityLabel}`}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          title="Previous page"
        >
          <ChevronLeftIcon size={13} />
        </Button>
        <span style={{ fontSize: 12, color: 'var(--osmos-fg-muted)', fontFamily: FONT, minWidth: 60, textAlign: 'center' }}>
          {page} / {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
          title="Next page"
        >
          <ChevronRightIcon size={13} />
        </Button>
      </div>
    </div>
  );
}
