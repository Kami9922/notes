import { useState, useEffect, useCallback, useRef } from 'react'
import { db } from '../../db/database'
import { Box, Typography, Paper } from '@mui/material'

import type { Note } from '../../types/types'
import { EditPage, Modal, PreviewPage } from './components'

interface WorkSpaceProps {
	activeNote: Note | null
	onNoteUpdate: (updatedNote: Note) => void
}

export const WorkSpace = ({ activeNote, onNoteUpdate }: WorkSpaceProps) => {
	const [localNote, setLocalNote] = useState<Note | null>(null)
	const [isEditing, setIsEditing] = useState(false)
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const saveTimeoutRef = useRef<number | undefined>(undefined)
	const lastSavedContent = useRef<string>('')
	const prevActiveNoteId = useRef<number | undefined>(null)

	const isNewNote = activeNote?.title === '' && activeNote?.content === ''

	const handleDelete = () => {
		if (!localNote?.id) return
		setDeleteDialogOpen(true)
	}

	const handleConfirmDelete = async () => {
		if (!localNote?.id) return
		await db.notes.delete(localNote.id)
		onNoteUpdate({} as Note)
		setLocalNote(null)
		setDeleteDialogOpen(false)
	}

	const handleExitEdit = async () => {
		if (saveTimeoutRef.current) {
			clearTimeout(saveTimeoutRef.current)
		}

		if (localNote && localNote.content !== lastSavedContent.current) {
			await saveNote(localNote)
		}

		setIsEditing(false)
	}

	const saveNote = useCallback(
		async (noteToSave: Note) => {
			if (!noteToSave?.id) return

			try {
				const updatedNote = {
					...noteToSave,
					updatedAt: new Date(),
				}

				await db.notes.update(noteToSave.id, updatedNote)
				lastSavedContent.current = noteToSave.content
				onNoteUpdate(updatedNote)
			} catch (error) {
				console.error('Ошибка при сохранении:', error)
			}
		},
		[onNoteUpdate]
	)

	const handleChange = useCallback(
		(field: keyof Note, value: string) => {
			if (!localNote) return

			const updatedNote = {
				...localNote,
				[field]: value,
			}

			setLocalNote(updatedNote)

			if (saveTimeoutRef.current) {
				clearTimeout(saveTimeoutRef.current)
			}

			if (value !== lastSavedContent.current) {
				saveTimeoutRef.current = window.setTimeout(() => {
					saveNote(updatedNote)
				}, 500)
			}
		},
		[localNote, saveNote]
	)

	useEffect(() => {
		if (activeNote) {
			setLocalNote({ ...activeNote })
			lastSavedContent.current = activeNote.content

			if (isNewNote) {
				setIsEditing(true)
			} else if (prevActiveNoteId.current !== activeNote.id) {
				setIsEditing(false)
			}

			prevActiveNoteId.current = activeNote.id

			if (saveTimeoutRef.current) {
				clearTimeout(saveTimeoutRef.current)
			}
		} else {
			setLocalNote(null)
		}
	}, [activeNote, isNewNote])

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
