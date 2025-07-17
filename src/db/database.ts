import { Dexie, type Table } from 'dexie'
import type { Note } from '../types/types'

export class NotesDatabase extends Dexie {
	public notes: Table<Note, number>

	constructor() {
		super('NotesAppDB')

		this.version(1).stores({
			notes: '++id, title, content, createdAt, updatedAt',
		})

		this.notes = this.table('notes')

		this.notes.hook('updating', (modifications: Partial<Note>) => {
			return { ...modifications, updatedAt: new Date() }
		})
	}

	subscribeToChanges(callback: () => void): () => void {
		const createHandler = () => callback()
		const updateHandler = () => callback()
		const deleteHandler = () => callback()

		this.notes.hook('creating').subscribe(createHandler)
		this.notes.hook('updating').subscribe(updateHandler)
		this.notes.hook('deleting').subscribe(deleteHandler)

		return () => {
			createHandler()
			updateHandler()
			deleteHandler()
		}
	}
}

export const db = new NotesDatabase()

export async function initializeDB(): Promise<void> {
	if ((await db.notes.count()) === 0) {
		await db.notes.add({
			title: 'Первая заметка',
			content: '# Добро пожаловать!\nЭто ваша первая заметка.',
			createdAt: new Date(),
			updatedAt: new Date(),
		})
	}
}
