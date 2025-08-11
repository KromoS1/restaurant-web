import { useUpdateGuestMutation } from '@/api/guest/guest.mutate'
import { FieldApp } from '@/components/ui/form/field'
import { ICreateGuest, IGuest } from '@/types/guest.interface'
import { useForm } from '@tanstack/react-form'
import { FC } from 'react'

type Props = {
	guest: IGuest
	closeModal: () => void
}

export const EditGuestForm: FC<Props> = ({ guest, closeModal }) => {
	const { mutateAsync: updateGuest } = useUpdateGuestMutation()

	const form = useForm({
		defaultValues: {
			name: guest.name,
			phone: guest.phone,
			email: guest.email || '',
			notes: guest.notes || '',
		},
		onSubmit: async ({ value }) => {
			const updatedFields: Partial<ICreateGuest> = {}
			
			if (value.name !== guest.name) updatedFields.name = value.name
			if (value.phone !== guest.phone) updatedFields.phone = value.phone
			if (value.email !== (guest.email || '')) updatedFields.email = value.email
			if (value.notes !== (guest.notes || '')) updatedFields.notes = value.notes

			await updateGuest({ id: guest.id, data: updatedFields })
			closeModal()
		},
	})

	return (
		<form onSubmit={(e) => {
			e.preventDefault()
			e.stopPropagation()
			form.handleSubmit()
		}}>
			<form.Field
				name="name"
				children={(field) => (
					<FieldApp 
						title="Имя гостя" 
						placeholder="Введите имя гостя" 
						value={field.state.value} 
						onChange={(e) => field.handleChange(e.target.value)} 
					/>
				)}
			/>
			<form.Field
				name="phone"
				children={(field) => (
					<FieldApp 
						title="Телефон" 
						placeholder="Введите номер телефона" 
						value={field.state.value} 
						onChange={(e) => field.handleChange(e.target.value)} 
					/>
				)}
			/>
			<form.Field
				name="email"
				children={(field) => (
					<FieldApp 
						title="Email" 
						placeholder="Введите email (необязательно)" 
						value={field.state.value} 
						onChange={(e) => field.handleChange(e.target.value)} 
					/>
				)}
			/>
			<form.Field
				name="notes"
				children={(field) => (
					<FieldApp 
						title="Заметки" 
						placeholder="Введите заметки (необязательно)" 
						value={field.state.value} 
						onChange={(e) => field.handleChange(e.target.value)} 
					/>
				)}
			/>
			<button type="submit" className="btn btn-primary">Сохранить изменения</button>
		</form>
	)
}
