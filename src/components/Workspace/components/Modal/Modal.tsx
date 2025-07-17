import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material'
import type { Note } from '../../../../types/types'

interface ModalProps {
	deleteDialogOpen: boolean
	setDeleteDialogOpen: (open: boolean) => void
	localNote: Note | null
	handleConfirmDelete: () => Promise<void>
}

export const Modal = ({
	deleteDialogOpen,
	setDeleteDialogOpen,
	localNote,
	handleConfirmDelete,
}: ModalProps) => {
	return (
		<Dialog
			open={deleteDialogOpen}
			onClose={() => setDeleteDialogOpen(false)}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'>
			<DialogTitle id='alert-dialog-title'>Удаление заметки</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					Вы уверены, что хотите удалить заметку "
					{localNote?.title || 'Без названия'}"?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => setDeleteDialogOpen(false)}
					color='primary'>
					Отмена
				</Button>
				<Button
					onClick={handleConfirmDelete}
					color='error'
					autoFocus>
					Удалить
				</Button>
			</DialogActions>
		</Dialog>
	)
}
