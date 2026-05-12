import { useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Checkbox } from '../../../ui/atoms/Checkbox';

// Selection column definition — prepended automatically when features.select is true
const selectionColumnDef = {
  id: 'select',
  enableSorting: false,
  enableHiding: false,
  size: 40,
  header: ({ table }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      onChange={() => table.toggleAllPageRowsSelected(!table.getIsAllPageRowsSelected())}
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      disabled={!row.getCanSelect()}
      onChange={() => row.toggleSelected()}
    />
  ),
};

/**
 * useOsmosTable — thin TanStack Table v8 wrapper.
 *
 * @param {object}   opts.columns      - TanStack column defs
 * @param {Array}    opts.data         - Array of row objects
 * @param {object}   opts.features     - { sort, select, paginate, columnVisibility, search }
 * @param {Function} opts.onRowSelect  - Called with selected row objects whenever selection changes
 *
 * @returns {{ table, globalFilter, setGlobalFilter }}
 */
export function useOsmosTable({ columns, data, features = {}, onRowSelect }) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const resolvedColumns = features.select
    ? [selectionColumnDef, ...columns]
    : columns;

  const table = useReactTable({
    data,
    columns: resolvedColumns,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      rowSelection,
      ...(features.paginate && { pagination }),
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    ...(features.paginate && { onPaginationChange: setPagination }),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(features.paginate && { getPaginationRowModel: getPaginationRowModel() }),
    enableRowSelection: !!features.select,
    enableSorting: !!features.sort,
    enableHiding: true,
    autoResetPageIndex: false,
  });

  useEffect(() => {
    if (onRowSelect) {
      onRowSelect(table.getSelectedRowModel().rows.map(r => r.original));
    }
  }, [rowSelection]); // eslint-disable-line react-hooks/exhaustive-deps

  return { table, globalFilter, setGlobalFilter };
}
