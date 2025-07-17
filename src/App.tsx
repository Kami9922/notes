import { Route, Routes } from 'react-router-dom'
import { Notes, Auth } from './pages'
import { AuthProvider } from './context/AuthProvider'
import { PrivateRoute } from './components'
import { NotFound } from './components/NotFound/NotFound'

export const App = () => {
	return (
		<>
			<AuthProvider>
				<Routes>
					<Route
						path='/notes'
						element={
							<PrivateRoute>
								<Notes />
							</PrivateRoute>
						}
					/>
					<Route
						path='/'
						element={<Auth />}
					/>
					<Route
						path='*'
						element={<NotFound />}
					/>
				</Routes>
			</AuthProvider>
		</>
	)
}
