import { ITable, TableStatus } from '@/types/table.interface'
import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<ITable>()

interface ActionsProps {
  onEdit?: (table: ITable) => void
  onDelete?: (tableId: string) => void
}

const getBadgeClass = (status: TableStatus) => {
	switch (status) {
		case TableStatus.AVAILABLE:
			return 'badge badge-success'
		case TableStatus.OCCUPIED:
			return 'badge badge-error'
		case TableStatus.RESERVED:
			return 'badge badge-warning'
		case TableStatus.MAINTENANCE:
			return 'badge badge-primary'
	}
}

export const createColumnsRestaurantTable = (actions?: ActionsProps) => [
  columnHelper.accessor('number', {
    header: 'Number',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor(row => row.minSeats, {
    id: 'minSeats',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Min Seats</span>,
  }),
  columnHelper.accessor('maxSeats', {
    header: () => 'Max Seats',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('type', {
    header: () => <span>Type</span>,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue()
      
      return <span className={getBadgeClass(status)}>{status}</span>
    },
  }),
  columnHelper.accessor('location', {
    header: 'Location',
  }),
	columnHelper.accessor('description', {
    header: 'Description',
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button
          className="btn btn-sm btn-primary"
          onClick={() => actions?.onEdit?.(row.original)}
          title="Редактировать"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          className="btn btn-sm btn-error"
          onClick={() => actions?.onDelete?.(row.original.id)}
          title="Удалить"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 8.142A2 2 0 0116.138 17H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    ),
  }),
]