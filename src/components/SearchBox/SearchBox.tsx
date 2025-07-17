import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'

interface SearchBoxProps {
	onSearch: (query: string) => void
}

export const SearchBox = ({ onSearch }: SearchBoxProps) => {
	const [query, setQuery] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value
		setQuery(val)
		onSearch(val)
	}

	return (
		<TextField
			size='small'
			placeholder='Поиск заметок...'
			value={query}
			onChange={handleChange}
			sx={{ width: 250 }}
			InputProps={{
				startAdornment: (
					<InputAdornment position='start'>
						<SearchIcon color='action' />
					</InputAdornment>
				),
			}}
			variant='outlined'
		/>
	)
}
