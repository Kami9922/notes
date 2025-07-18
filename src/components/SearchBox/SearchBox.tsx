import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface SearchBoxProps {
	query: string
	handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchBox = ({ query, handleSearch }: SearchBoxProps) => {
	return (
		<TextField
			size='small'
			placeholder='Поиск заметок...'
			value={query}
			onChange={handleSearch}
			sx={{ width: 250 }}
			variant='outlined'
			slotProps={{
				input: {
					startAdornment: (
						<InputAdornment position='start'>
							<SearchIcon color='action' />
						</InputAdornment>
					),
				},
			}}
		/>
	)
}
