import React from 'react';
import { Toolbar } from '../molecules/Toolbar';
import { Pagination } from '../molecules/Pagination';
import { FormDrawer } from '../molecules/FormDrawer';
import { EmptyState } from '../molecules/EmptyState';
import { SpinLoader } from '../atoms/SpinLoader';
import { DataTable } from '../../shared/components/data-table/DataTable';

/**
 * DataListPage — standard list page shell.
 * Composes Toolbar + DataTable + Pagination + FormDrawer + EmptyState.
 * Figma: covers the 37 pages sharing this structure.
 *
 * Usage:
 *   <DataListPage
 *     toolbar={{ left: <SearchBar />, right: <Button>Add</Button> }}
 *     columns={columnDefs}
 *     data={rows}
 *     isLoading={loading}
 *     pagination={{ total: 120, page: 1, perPage: 20, onChange: setPage }}
 *     drawer={{ open, onClose, title: 'Add Item', onSubmit: handleSave, children: <form /> }}
 *     empty={<EmptyState title="No items yet" />}
 *   />
 */
export function DataListPage({
  toolbar,
  columns = [],
  data = [],
  isLoading = false,
  pagination,
  drawer,
  empty,
  tableProps,
  style,
}) {
  const isEmpty = !isLoading && data.length === 0;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--osmos-bg)',
      border: '1px solid var(--osmos-border)',
      borderRadius: 10,
      overflow: 'hidden',
      fontFamily: "'Open Sans', sans-serif",
      ...style,
    }}>
      {toolbar && (
        <Toolbar left={toolbar.left} right={toolbar.right} />
      )}

      <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
        {isLoading && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--osmos-bg)', zIndex: 2, opacity: 0.85,
          }}>
            <SpinLoader size="lg" />
          </div>
        )}

        {isEmpty
          ? <div style={{ padding: 48, display: 'flex', justifyContent: 'center' }}>{empty}</div>
          : <DataTable columns={columns} data={data} {...tableProps} />
        }
      </div>

      {pagination && !isEmpty && (
        <div style={{ borderTop: '1px solid var(--osmos-border)', padding: '8px 16px' }}>
          <Pagination
            total={pagination.total}
            page={pagination.page}
            perPage={pagination.perPage}
            onChange={pagination.onChange}
          />
        </div>
      )}

      {drawer && (
        <FormDrawer
          open={drawer.open}
          onClose={drawer.onClose}
          title={drawer.title}
          subtitle={drawer.subtitle}
          onSubmit={drawer.onSubmit}
          submitLabel={drawer.submitLabel}
          isLoading={drawer.isLoading}
          width={drawer.width}
        >
          {drawer.children}
        </FormDrawer>
      )}
    </div>
  );
}
