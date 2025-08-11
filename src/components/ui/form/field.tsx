import { FC } from 'react'

type Props = {
	type?: 'text' | 'number' | 'textarea'
	title: string
	placeholder?: string
	label?: string
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const FieldApp: FC<Props> = ({title, placeholder, value, onChange, label, type = 'text'}) => {
	return (
		<fieldset className="fieldset">
			<legend className="fieldset-legend">{title}</legend>
			<input type={type} className="input" placeholder={placeholder} value={value} onChange={onChange} />
			{label && <p className="label">{label}</p>}
		</fieldset>
	)
}