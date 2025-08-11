import { FC } from 'react'

type Props = {
	title: string
	options: string[]
	value: string
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const SelectApp: FC<Props> = ({title, options, value, onChange}) => {
	return (
		<fieldset className="fieldset">
			<legend className="fieldset-legend">{title}</legend>
			<select defaultValue="Pick a browser" className="select" value={value} onChange={onChange}>
				<option disabled={true}>Pick a browser</option>
				{options.map((option) => (
					<option key={option} value={option}>{option}</option>
				))}
			</select>
	</fieldset>
	)
}