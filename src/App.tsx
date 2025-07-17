import { Route, Routes } from 'react-router-dom'
import { Notes, Auth } from './pages'
import { AuthProvider } from './context/AuthProvider'

export const App = () => {
	return (
		<>
			<AuthProvider>
				<Routes>
					<Route
						path='/notes'
						element={<Notes />}
					/>
					<Route
						path='/'
						element={<Auth />}
					/>
				</Routes>
			</AuthProvider>
		</>
	)
}
