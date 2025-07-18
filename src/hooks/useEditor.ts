// hooks/useEditor.ts
import { useState, useEffect, useRef, useCallback } from 'react'
import { db } from '../db/database'
import type { Note } from '../types/types'

export const useEditor = (
	activeNote: Note | null,
	onNoteUpdate: (note: Note) => void
) => {
	const [localNote, setLocalNote] = useState<Note | null>(null)
	const [isEditing, setIsEditing] = useState(false)
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const saveTimeoutRef = useRef<number | undefined>(undefined)
	const lastSavedContent = useRef<string>('')
	const prevActiveNoteId = useRef<number | undefined>(null)

	const isNewNote = activeNote?.title === '' && activeNote?.content === ''

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

	const handleDelete = useCallback(() => {
		if (!localNote?.id) return
		setDeleteDialogOpen(true)
	}, [localNote])

	const handleConfirmDelete = useCallback(async () => {
		if (!localNote?.id) return
		await db.notes.delete(localNote.id)
		onNoteUpdate({} as Note)
		setLocalNote(null)
		setDeleteDialogOpen(false)
	}, [localNote, onNoteUpdate])

	const handleExitEdit = useCallback(async () => {
		if (saveTimeoutRef.current) {
			clearTimeout(saveTimeoutRef.current)
		}

		if (localNote && localNote.content !== lastSavedContent.current) {
			await saveNote(localNote)
		}

		setIsEditing(false)
	}, [localNote, saveNote])

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

	return {
		localNote,
		isEditing,
		deleteDialogOpen,
		setDeleteDialogOpen,
		handleChange,
		handleDelete,
		handleConfirmDelete,
		handleExitEdit,
		setIsEditing,
	}
}
