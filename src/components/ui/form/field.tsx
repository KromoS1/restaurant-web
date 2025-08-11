import { FC } from 'react'

type Props = {
	type?: 'text' | 'number' | 'textarea' | 'datetime-local'
	title: string
	placeholder?: string
	label?: string
	value?: string
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const FieldApp: FC<Props> = ({title, placeholder, value, onChange, label, type = 'text'}) => {
	return (
		<fieldset className="fieldset">
			<legend className="fieldset-legend">{title}</legend>
			{type === 'textarea' ? (
				<textarea 
					className="textarea textarea-bordered w-full" 
					placeholder={placeholder} 
					value={value} 
					onChange={onChange}
					rows={3}
				/>
			) : (
				<input 
					type={type} 
					className="input input-bordered w-full" 
					placeholder={placeholder} 
					value={value} 
					onChange={onChange} 
				/>
			)}
			{label && <p className="label-text-alt mt-1">{label}</p>}
		</fieldset>
	)
}