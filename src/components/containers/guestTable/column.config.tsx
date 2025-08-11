import { IGuest } from '@/types/guest.interface'
import { createColumnHelper } from '@tanstack/react-table'
import { EditGuest } from './editGuest'

const columnHelper = createColumnHelper<IGuest>()


export const createColumnsGuestTable = () => [
  columnHelper.accessor('name', {
    header: 'Имя',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('phone', {
    header: 'Телефон',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue() || '—',
  }),
  columnHelper.accessor('notes', {
    header: 'Заметки',
    cell: info => info.getValue() || '—',
  }),
  columnHelper.accessor('createdAt', {
    header: 'Дата создания',
    cell: info => new Date(info.getValue()).toLocaleDateString('ru-RU'),
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Действия',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <EditGuest guest={row.original} />
      </div>
    ),
  }),
]
