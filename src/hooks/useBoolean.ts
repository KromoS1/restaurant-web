'use client'

import { useCallback, useState } from 'react'

type UseBooleanOutput = {
	value: boolean
	setValue: (value: boolean) => void
	setTrue: () => void
	setFalse: () => void
	toggle: () => void
}

export const useBoolean = (defaultValue?: boolean): UseBooleanOutput => {
	const [value, setValue] = useState(!!defaultValue)

	const setTrue = useCallback(() => setValue(true), [])
	const setFalse = useCallback(() => setValue(false), [])
	const toggle = useCallback(() => setValue(x => !x), [])

	return { value, setValue, setTrue, setFalse, toggle }
}
