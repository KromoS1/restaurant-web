import { ITable, TableStatus } from '@/types/table.interface'
import { createColumnHelper } from '@tanstack/react-table'
import { EditTable } from './editTable'

const columnHelper = createColumnHelper<ITable>()

interface ActionsProps {
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
    header: 'Номер Столика',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor(row => row.minSeats, {
    id: 'minSeats',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Мин. мест</span>,
  }),
  columnHelper.accessor('maxSeats', {
    header: () => 'Макс. мест',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('type', {
    header: () => <span>Тип</span>,
  }),
  columnHelper.accessor('status', {
    header: 'Статус',
    cell: info => {
      const status = info.getValue()
      
      return <span className={getBadgeClass(status)}>{status}</span>
    },
  }),
  columnHelper.accessor('location', {
    header: 'Расположение',
  }),
	columnHelper.accessor('description', {
    header: 'Описание',
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Действия',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <EditTable table={row.original} />
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