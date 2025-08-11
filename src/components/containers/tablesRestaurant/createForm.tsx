import { useCreateTableMutation } from '@/api/table/table.mutate'
import { FieldApp } from '@/components/ui/form/field'
import { SelectApp } from '@/components/ui/form/select'
import { ICreateTable, TableType } from '@/types/table.interface'
import { useForm } from '@tanstack/react-form'
import { FC } from 'react'

const defaultTable: ICreateTable = {
	number: 0,
	minSeats: 0,
	maxSeats: 0,
	type: TableType.REGULAR,
	description: '',
	location: '',
}

type Props = {
	closeModal: () => void
}

export const CreateForm: FC<Props> = ({closeModal}) => {
	const {mutateAsync: createTable} = useCreateTableMutation()

	const form = useForm({
		defaultValues: defaultTable,
		onSubmit: async ({ value }) => {
			await createTable(value)
			closeModal()
		},
	})

	return (
		<form  onSubmit={(e) => {
			e.preventDefault()
			e.stopPropagation()
			form.handleSubmit()
		}}>
			<form.Field
				name="number"
				children={(field) => (
					<FieldApp type="number" title="Номер столика" placeholder="Введите номер столика" value={`${field.state.value}`} onChange={(e) => field.handleChange(Number(e.target.value))} />
				)}
			/>
			<form.Field
				name="minSeats"
				children={(field) => <FieldApp type="number" title="Минимальное количество мест" placeholder="Введите минимальное количество мест" value={`${field.state.value}`} onChange={(e) => field.handleChange(Number(e.target.value))} />}
			/>
			<form.Field
				name="maxSeats"
				children={(field) => <FieldApp type="number" title="Максимальное количество мест" placeholder="Введите максимальное количество мест" value={`${field.state.value}`} onChange={(e) => field.handleChange(Number(e.target.value))} />}
			/>
			<form.Field
				name="type"
				children={(field) => <SelectApp 
					title="Тип столика" 
					options={[
						{ value: TableType.REGULAR, label: 'Обычный' },
						{ value: TableType.VIP, label: 'VIP' },
						{ value: TableType.FAMILY, label: 'Семейный' }
					]} 
					value={`${field.state.value}`} 
					onChange={(e) => field.handleChange(e.target.value as TableType)} 
				/>}
			/>
			<form.Field
				name="location"
				children={(field) => <FieldApp title="Расположение" placeholder="Введите расположение столика" value={`${field.state.value}`} onChange={(e) => field.handleChange(e.target.value)} />}
			/>
			<form.Field
				name="description"
				children={(field) => <FieldApp title="Описание" placeholder="Введите описание" value={`${field.state.value}`} onChange={(e) => field.handleChange(e.target.value)} />}
			/>
			<button type="submit" className="btn btn-primary">Добавить столик</button>
		</form>
	)
}