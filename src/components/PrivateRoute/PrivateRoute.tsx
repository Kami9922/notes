import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider'

export const PrivateRoute = ({ children }: React.PropsWithChildren) => {
	const auth = useAuth()
	const location = useLocation()

	if (auth.user === null) {
		return (
			<Navigate
				to='/'
				state={{ from: location.pathname }}
				replace
			/>
		)
	}

	return children
}
