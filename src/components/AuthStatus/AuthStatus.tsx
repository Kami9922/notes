import { useAuth } from '../../context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography, Avatar, Paper } from '@mui/material'

export const AuthStatus = () => {
	const auth = useAuth()
	const navigate = useNavigate()

	const handleSignout = () => {
		auth.signout(() => {
			navigate('/auth')
		})
	}

	return (
		<Box
			sx={{
				position: 'absolute',
				top: '0px',
				right: '0px',
			}}>
			<Paper
				elevation={3}
				sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}>
				<Avatar
					sx={{
						bgcolor: 'primary.main',
						width: 32,
						height: 32,
						fontSize: '0.875rem',
					}}>
					{auth.user?.charAt(0).toUpperCase()}
				</Avatar>

				<Typography
					variant='subtitle1'
					component='span'
					fontWeight='bold'>
					{auth.user}
				</Typography>

				<Button
					variant='outlined'
					color='error'
					size='small'
					onClick={handleSignout}
					sx={{ ml: 1 }}>
					Выйти
				</Button>
			</Paper>
		</Box>
	)
}
