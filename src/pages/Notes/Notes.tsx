import { useCallback, useState } from 'react'
import { Box } from '@mui/material'
import { SearchBox, SideBar, WorkSpace, AuthStatus } from '../../components'
import type { Note } from '../../types/types'
import { useSearch } from '../../hooks/useSearch'

export const Notes = () => {
	const { query, handleSearch } = useSearch()
	const [activeNote, setActiveNote] = useState<Note | null>(null)
	const [refreshTrigger, setRefreshTrigger] = useState({})

	const handleNoteUpdate = useCallback(
		(updatedNote: Note) => {
			if (activeNote?.id === updatedNote.id) {
				setActiveNote(updatedNote)
			}
			setRefreshTrigger({})
		},
		[activeNote]
	)

	return (
		<Box
			sx={{
				height: '100vh',
				width: '1200px',
				display: 'flex',
				flexDirection: 'column',
			}}>
			<Box
				sx={{
					p: 2,
					borderBottom: '1px solid',
					borderColor: 'divider',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					bgcolor: 'background.paper',
				}}>
				<AuthStatus />
				<SearchBox
					query={query}
					handleSearch={handleSearch}
				/>
			</Box>

			<Box
				sx={{
					flexGrow: 1,
					display: 'grid',
					gridTemplateColumns: '280px 1fr',
					bgcolor: 'background.default',
					overflow: 'hidden',
				}}>
				<SideBar
					query={query}
					setActiveNote={setActiveNote}
					refreshTrigger={refreshTrigger}
				/>
				<WorkSpace
					activeNote={activeNote}
					onNoteUpdate={handleNoteUpdate}
				/>
			</Box>
		</Box>
	)
}
