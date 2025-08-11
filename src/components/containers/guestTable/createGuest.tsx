'use client'

import { useBoolean } from '@/hooks/useBoolean'
import { CreateGuestForm } from './createGuestForm'

export const CreateGuest = () => {
	const {value, setTrue, setFalse} = useBoolean()

	return (
		<>
			<button className="btn btn-primary" onClick={setTrue}>
				Добавить гостя
			</button>

			{value && (
				<dialog className="modal modal-open">
					<div className="modal-box">
						<h3 className="font-bold text-lg mb-4">Добавить нового гостя</h3>
						<CreateGuestForm closeModal={setFalse} />
						<div className="modal-action">
							<button 
								className="btn btn-ghost" 
								onClick={setFalse}
							>
								Отмена
							</button>
						</div>
					</div>
					<div className="modal-backdrop" onClick={setFalse}></div>
				</dialog>
			)}
		</>
	)
}
