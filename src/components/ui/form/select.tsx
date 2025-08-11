import { FC } from 'react'

type SelectOption = {
	value: string
	label: string
}

type Props = {
	title: string
	options: SelectOption[]
	value: string
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
	placeholder?: string
}

export const SelectApp: FC<Props> = ({title, options, value, onChange, placeholder}) => {
	return (
		<fieldset className="fieldset">
			<legend className="fieldset-legend">{title}</legend>
			<select className="select select-bordered w-full" value={value} onChange={onChange}>
				{placeholder && <option value="" disabled>{placeholder}</option>}
				{options.map((option) => (
					<option key={option.value} value={option.value}>{option.label}</option>
				))}
			</select>
		</fieldset>
	)
}