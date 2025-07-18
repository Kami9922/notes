import { Box, Typography, Paper } from '@mui/material'
import { useEditor } from '../../hooks/useEditor'
import { EditPage, Modal, PreviewPage } from './components'
import type { Note } from '../../types/types'

interface WorkSpaceProps {
	activeNote: Note | null
	onNoteUpdate: (updatedNote: Note) => void
}

export const WorkSpace = ({ activeNote, onNoteUpdate }: WorkSpaceProps) => {
	const {
		localNote,
		isEditing,
		deleteDialogOpen,
		setDeleteDialogOpen,
		handleChange,
		handleDelete,
		handleConfirmDelete,
		handleExitEdit,
		setIsEditing,
	} = useEditor(activeNote, onNoteUpdate)

	if (!localNote) {
		return (
			<Box
				sx={{
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					color: 'text.secondary',
					bgcolor: 'background.paper',
				}}>
				<Typography variant='h6'>
					Выберите заметку или создайте новую
				</Typography>
			</Box>
		)
	}

	return (
		<Paper
			elevation={4}
			sx={{
				p: 3,
				overflow: 'auto',
				display: 'flex',
				flexDirection: 'column',
				bgcolor: 'background.paper',
				borderRadius: 2,
			}}>
			{isEditing ? (
				<EditPage
					handleChange={handleChange}
					handleExitEdit={handleExitEdit}
					localNote={localNote}
				/>
			) : (
				<PreviewPage
					localNote={localNote}
					setIsEditing={setIsEditing}
					handleDelete={handleDelete}
				/>
			)}
			<Modal
				deleteDialogOpen={deleteDialogOpen}
				setDeleteDialogOpen={setDeleteDialogOpen}
				localNote={localNote}
				handleConfirmDelete={handleConfirmDelete}
			/>
		</Paper>
	)
}
