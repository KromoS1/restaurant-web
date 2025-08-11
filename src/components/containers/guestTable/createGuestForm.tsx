import { ICreateGuest, useCreateGuestMutation } from '@/api/guest/guest.mutate'
import { FieldApp } from '@/components/ui/form/field'
import { useForm } from '@tanstack/react-form'
import { FC } from 'react'

const defaultGuest: ICreateGuest = {
	name: '',
	phone: '',
	email: '',
	notes: '',
}

type Props = {
	closeModal: () => void
}

export const CreateGuestForm: FC<Props> = ({ closeModal }) => {
	const { mutateAsync: createGuest } = useCreateGuestMutation()

	const form = useForm({
		defaultValues: defaultGuest,
		onSubmit: async ({ value }) => {
			await createGuest(value)
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
			<button type="submit" className="btn btn-primary">Добавить гостя</button>
		</form>
	)
}
