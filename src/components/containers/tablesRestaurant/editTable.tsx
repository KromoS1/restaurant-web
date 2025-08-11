'use client'

import { ITable } from '@/types/table.interface'
import { FC, useState } from 'react'
import { EditTableForm } from './editTableForm'

type Props = {
	table: ITable
}

export const EditTable: FC<Props> = ({ table }) => {
	const [isOpen, setIsOpen] = useState(false)

	const openModal = () => setIsOpen(true)
	const closeModal = () => setIsOpen(false)

	return (
		<>
			<button 
				className="btn btn-sm btn-primary"
				onClick={openModal}
				title="Редактировать"
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
				</svg>
			</button>

			{isOpen && (
				<dialog className="modal modal-open">
					<div className="modal-box">
						<h3 className="font-bold text-lg mb-4">
							Редактировать столик №{table.number}
						</h3>
						<EditTableForm table={table} closeModal={closeModal} />
						<div className="modal-action">
							<button 
								className="btn btn-ghost" 
								onClick={closeModal}
							>
								Отмена
							</button>
						</div>
					</div>
					<div className="modal-backdrop" onClick={closeModal}></div>
				</dialog>
			)}
		</>
	)
}
