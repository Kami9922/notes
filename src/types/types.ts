import type { ReactNode } from 'react'

export interface AuthContextType {
	user: string | null
	signin: (newUser: string, callback: () => void) => void
	signout: (callback: () => void) => void
}

export interface AuthProviderProps {
	children: ReactNode
}
export interface Note {
	id?: number
	title: string
	content: string
	createdAt: Date
	updatedAt: Date
}
