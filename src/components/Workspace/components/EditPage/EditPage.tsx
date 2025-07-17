import { Button, Stack, TextField } from '@mui/material'
import { Save as SaveIcon } from '@mui/icons-material'
import type { Note } from '../../../../types/types'

interface EditPageProps {
	localNote: Note
	handleChange: (field: keyof Note, value: string) => void
	handleExitEdit: () => Promise<void>
}

export const EditPage = ({
	localNote,
	handleChange,
	handleExitEdit,
}: EditPageProps) => {
	return (
		<Stack
			spacing={2}
			sx={{ flexGrow: 1 }}>
			<TextField
				fullWidth
				variant='outlined'
				label='Заголовок'
				value={localNote.title}
				onChange={(e) => handleChange('title', e.target.value)}
				sx={{ mb: 2 }}
				autoFocus
			/>

			<TextField
				fullWidth
				multiline
				minRows={12}
				variant='outlined'
				label='Содержание'
				value={localNote.content}
				onChange={(e) => handleChange('content', e.target.value)}
				sx={{ flexGrow: 1, mb: 2, fontFamily: 'Monospace' }}
			/>

			<Stack
				direction='row'
				spacing={2}
				justifyContent='flex-end'>
				<Button
					variant='contained'
					color='primary'
					startIcon={<SaveIcon />}
					onClick={handleExitEdit}>
					Закрыть редактор
				</Button>
			</Stack>
		</Stack>
	)
}
