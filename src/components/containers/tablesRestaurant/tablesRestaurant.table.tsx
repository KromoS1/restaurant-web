'use client'

import { useDeleteTableMutation } from '@/api/table/table.mutate'
import { useTablesQuery } from '@/api/table/table.query'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { createColumnsRestaurantTable } from './column.config'

export const TablesRestaurant = () => {
	const { data, isLoading, error } = useTablesQuery()
	const { mutate: deleteTable } = useDeleteTableMutation()



	const handleDelete = async (tableId:  string) => {
		deleteTable(tableId)
	}

	const table = useReactTable({
    data: data || [],
    columns: createColumnsRestaurantTable({
			onDelete: handleDelete,
		}),
    getCoreRowModel: getCoreRowModel(),
  })

	if (isLoading) return <div>Загрузка...</div>
	if (error) return <div>Ошибка: {error.message}</div>

	return (
		<div className="overflow-x-auto rounded-box border border-black bg-white ">
  		<table className="table bg-white">
				<thead className="bg-gray-100">
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th key={header.id} className="bg-gray-100 text-gray-900 font-semibold border-b border-gray-300">
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => (
						<tr key={row.id}>
							{row.getVisibleCells().map(cell => (
								<td key={cell.id} className="text-gray-900 border-b border-gray-200">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
				<tfoot>
					{table.getFooterGroups().map(footerGroup => (
						<tr key={footerGroup.id}>
							{footerGroup.headers.map(header => (
								<th key={header.id} className="bg-gray-50 text-gray-900 font-semibold border-t border-gray-300">
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.footer,
												header.getContext()
											)}
								</th>
							))}
						</tr>
					))}
				</tfoot>
			</table>
		</div>
	)
}