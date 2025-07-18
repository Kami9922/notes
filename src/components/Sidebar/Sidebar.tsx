import { useEffect, useState, useCallback } from 'react'
import { db } from '../../db/database'
import { ListItem } from '../'
import { Box, Button, List, Typography } from '@mui/material'
import type { Note } from '../../types/types'

interface SideBarProps {
	query: string
	setActiveNote: (note: Note) => void
	refreshTrigger: any
}

export const SideBar = ({
	query,
	setActiveNote,
	refreshTrigger,
}: SideBarProps) => {
	const [notes, setNotes] = useState<Note[]>([])
	const [activeNoteId, setActiveNoteId] = useState<number | null>(null)

	const loadNotes = useCallback(async () => {
		let notesQuery = db.notes.orderBy('updatedAt').reverse()

		if (query) {
			notesQuery = notesQuery.filter(
				(note) =>
					note.title.toLowerCase().includes(query.toLowerCase()) ||
					note.content.toLowerCase().includes(query.toLowerCase())
			)
		}

		const loadedNotes = await notesQuery.toArray()
		setNotes(loadedNotes)
	}, [query, refreshTrigger])

	const handleAddNote = async () => {
		const newNote = {
			title: '',
			content: '',
			createdAt: new Date(),
			updatedAt: new Date(),
		}

		const id = await db.notes.add(newNote)
		const createdNote = { ...newNote, id }
		setActiveNoteId(id)
		setActiveNote(createdNote)
		loadNotes()
	}

	const handleNoteSelect = (note: Note) => {
		setActiveNoteId(note.id!)
		setActiveNote(note)
	}

	useEffect(() => {
		loadNotes()
	}, [loadNotes])

	return (
		<Box
			sx={{
				borderRight: '1px solid',
				borderColor: 'divider',
				bgcolor: 'background.paper',
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
			}}>
			<Button
				variant='contained'
				color='primary'
				onClick={handleAddNote}
				sx={{ m: 2 }}>
				+ Новая заметка
			</Button>

			{notes.length === 0 ? (
				<Typography
					variant='body2'
					sx={{ p: 2, color: 'text.secondary' }}>
					Нет заметок
				</Typography>
			) : (
				<List sx={{ overflowY: 'auto', flexGrow: 1 }}>
					{notes.map((note) => (
						<ListItem
							key={note.id}
							note={note}
							isActive={activeNoteId === note.id}
							handleNoteSelect={handleNoteSelect}
						/>
					))}
				</List>
			)}
		</Box>
	)
}
