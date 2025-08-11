'use client'

import { useEffect, useRef } from 'react'
import { CreateForm } from './createForm'

export const CreateTable = () => {

	const modal = useRef<HTMLElement>(null)

	const showModal = () => {
		//@ts-ignore
		document.getElementById('create-table-modal')?.showModal()
	}

	const closeModal = () => {
		//@ts-ignore
		document.getElementById('create-table-modal')?.close()
	}

	useEffect(() => {
		modal.current = document.getElementById('create-table-modal')
	}, [])

	return ( 
		<>
			<button className="btn btn-info mb-4" onClick={showModal}>Добавить стол</button>
			<dialog id="create-table-modal" className="modal ">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Добавить стол</h3>
					<p className="py-4">Для добавления стола заполните поля ниже</p>
					<CreateForm closeModal={closeModal}/>
					<div className="modal-action">
						
					</div>
				</div>
			</dialog>
		</>
	)
}