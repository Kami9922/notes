import {
	Box,
	Divider,
	Stack,
	Typography,
	IconButton,
	Chip,
} from '@mui/material'
import ReactMarkdown from 'react-markdown'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import type { Note } from '../../../../types/types'

interface PreviewPageProps {
	localNote: Note
	setIsEditing: (isEditing: boolean) => void
	handleDelete: () => void
}

export const PreviewPage = ({
	localNote,
	setIsEditing,
	handleDelete,
}: PreviewPageProps) => {
	return (
		<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
			<Stack
				direction='row'
				justifyContent='space-between'
				alignItems='center'
				mb={2}>
				<Typography
					variant='h4'
					component='h1'
					noWrap
					sx={{ flexGrow: 1 }}>
					{localNote.title || <i>Без названия</i>}
				</Typography>

				<Stack
					direction='row'
					spacing={1}>
					<IconButton
						color='primary'
						onClick={() => setIsEditing(true)}
						aria-label='Редактировать'>
						<EditIcon />
					</IconButton>

					<IconButton
						color='error'
						onClick={handleDelete}
						aria-label='Удалить'>
						<DeleteIcon />
					</IconButton>
				</Stack>
			</Stack>

			<Divider sx={{ mb: 2 }} />

			<Box
				sx={{
					flexGrow: 1,
					overflowY: 'auto',
					'& h1, & h2': { mt: 3, mb: 2 },
					'& pre': {
						bgcolor: 'grey.100',
						p: 2,
						borderRadius: 1,
						overflowX: 'auto',
						fontFamily: 'Monospace',
					},
					lineHeight: 1.6,
				}}>
				<ReactMarkdown>
					{localNote.content ? localNote.content : 'Заметка пуста'}
				</ReactMarkdown>
			</Box>

			<Divider sx={{ my: 2 }} />

			<Stack
				direction='row'
				spacing={2}>
				<Chip
					label={`Создано: ${new Date(localNote.createdAt).toLocaleString()}`}
					variant='outlined'
					size='small'
				/>
				<Chip
					label={`Изменено: ${new Date(localNote.updatedAt).toLocaleString()}`}
					variant='outlined'
					size='small'
					color='primary'
				/>
			</Stack>
		</Box>
	)
}
