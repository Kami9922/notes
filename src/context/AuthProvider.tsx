import type { AuthContextType, AuthProviderProps } from '../types/types'
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}

const getItemFromLocalStorage = () => {
	const storedUser = localStorage.getItem('user')
	return storedUser ? storedUser : null
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<string | null>(getItemFromLocalStorage())

	const signin = (newUser: string, callback: () => void) => {
		setUser(newUser)
		localStorage.setItem('user', newUser)
		callback()
	}

	const signout = (callback: () => void) => {
		setUser(null)
		localStorage.removeItem('user')
		callback()
	}

	const value: AuthContextType = {
		user,
		signin,
		signout,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
