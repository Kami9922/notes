import { useState } from 'react'

export const useSearch = () => {
	const [query, setQuery] = useState('')

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setQuery(value)
	}

	return {
		query,
		handleSearch,
	}
}
