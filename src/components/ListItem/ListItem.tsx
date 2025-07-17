import { ListItemButton, ListItemText, Typography, Box } from '@mui/material'
import type { Note } from '../../types/types'

interface ListItemProps {
	note: Note
	isActive: boolean
	handleNoteSelect: (note: Note) => void
}

export const ListItem = ({
	note,
	isActive,
	handleNoteSelect,
}: ListItemProps) => {
	return (
		<ListItemButton
			selected={isActive}
			onClick={() => handleNoteSelect(note)}
			sx={{
				m: 2,
				alignItems: 'flex-start',
				py: 1,
				px: 2,
				borderRadius: 1,
				cursor: 'pointer',
				bgcolor: '#1976d2',
				color: 'white',
				'&:hover': {
					bgcolor: '#6bb5ff',
				},
				'&.Mui-selected': {
					bgcolor: '#cf978d',
					color: 'white',
					opacity: 1,
					'&:hover': {
						bgcolor: '#cf978d',
					},
				},
			}}>
			<Box sx={{ mr: 1, flexShrink: 0 }}>
				<Typography
					variant='caption'
					color='#000000'
					fontSize={8}
					noWrap>
					{new Date(note.updatedAt).toLocaleDateString()}
				</Typography>
			</Box>

			<ListItemText
				primary={
					<Typography
						variant='subtitle1'
						noWrap
						sx={{ fontWeight: isActive ? 'bold' : 'normal', color: '#ffffff' }}>
						{note.title || <i>Без названия</i>}
					</Typography>
				}
				secondary={
					<Typography
						variant='body2'
						color='#000000'
						noWrap
						sx={{ mt: 0.5 }}>
						{note.content.length > 60
							? note.content.substring(0, 60) + '...'
							: note.content}
					</Typography>
				}
			/>
		</ListItemButton>
	)
}
