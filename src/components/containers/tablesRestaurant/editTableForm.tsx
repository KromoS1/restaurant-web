import { useUpdateTableMutation } from '@/api/table/table.mutate'
import { FieldApp } from '@/components/ui/form/field'
import { SelectApp } from '@/components/ui/form/select'
import { ICreateTable, ITable, TableType } from '@/types/table.interface'
import { useForm } from '@tanstack/react-form'
import { FC } from 'react'

type Props = {
	table: ITable
	closeModal: () => void
}

export const EditTableForm: FC<Props> = ({ table, closeModal }) => {
	const { mutateAsync: updateTable } = useUpdateTableMutation()

	const form = useForm({
		defaultValues: {
			number: table.number,
			minSeats: table.minSeats,
			maxSeats: table.maxSeats,
			type: table.type,
			location: table.location || '',
			description: table.description || '',
		},
		onSubmit: async ({ value }) => {
			const updatedFields: Partial<ICreateTable> = {}
			
			if (value.number !== table.number) updatedFields.number = value.number
			if (value.minSeats !== table.minSeats) updatedFields.minSeats = value.minSeats
			if (value.maxSeats !== table.maxSeats) updatedFields.maxSeats = value.maxSeats
			if (value.type !== table.type) updatedFields.type = value.type
			if (value.location !== (table.location || '')) updatedFields.location = value.location
			if (value.description !== (table.description || '')) updatedFields.description = value.description

			await updateTable({ id: table.id, data: updatedFields })
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
				name="number"
				children={(field) => (
					<FieldApp 
						type="number" 
						title="Номер столика" 
						placeholder="Введите номер столика" 
						value={`${field.state.value}`} 
						onChange={(e) => field.handleChange(Number(e.target.value))} 
					/>
				)}
			/>
			<form.Field
				name="minSeats"
				children={(field) => (
					<FieldApp 
						type="number" 
						title="Минимальное количество мест" 
						placeholder="Введите минимальное количество мест" 
						value={`${field.state.value}`} 
						onChange={(e) => field.handleChange(Number(e.target.value))} 
					/>
				)}
			/>
			<form.Field
				name="maxSeats"
				children={(field) => (
					<FieldApp 
						type="number" 
						title="Максимальное количество мест" 
						placeholder="Введите максимальное количество мест" 
						value={`${field.state.value}`} 
						onChange={(e) => field.handleChange(Number(e.target.value))} 
					/>
				)}
			/>
			<form.Field
				name="type"
				children={(field) => (
					<SelectApp 
						title="Тип столика" 
						options={[
							{ value: TableType.REGULAR, label: 'Обычный' },
							{ value: TableType.VIP, label: 'VIP' },
							{ value: TableType.FAMILY, label: 'Семейный' }
						]} 
						value={`${field.state.value}`} 
						onChange={(e) => field.handleChange(e.target.value as TableType)} 
					/>
				)}
			/>
			<form.Field
				name="location"
				children={(field) => (
					<FieldApp 
						title="Расположение" 
						placeholder="Введите расположение столика" 
						value={`${field.state.value}`} 
						onChange={(e) => field.handleChange(e.target.value)} 
					/>
				)}
			/>
			<form.Field
				name="description"
				children={(field) => (
					<FieldApp 
						title="Описание" 
						placeholder="Введите описание" 
						value={`${field.state.value}`} 
						onChange={(e) => field.handleChange(e.target.value)} 
					/>
				)}
			/>
			<button type="submit" className="btn btn-primary">Сохранить изменения</button>
		</form>
	)
}
