import { type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../../context/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom'
import {
	Box,
	Button,
	Container,
	TextField,
	Typography,
	Paper,
	Alert,
} from '@mui/material'
import { useEffect, useRef } from 'react'

const signupSchema = yup.object({
	login: yup
		.string()
		.required('Обязательное поле')
		.max(100, 'Максимум 100 символов')
		.matches(/^[a-zA-Z0-9_]+$/, 'Некорректный логин'),
})

export const Auth = () => {
	const navigate = useNavigate()
	const auth = useAuth()
	const location = useLocation()

	const from = location.state?.from || '/notes'

	type FormValues = {
		login: string
	}

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		console.log('user', data.login)
		if (typeof data.login === 'string') {
			auth.signin(data.login, () => {
				navigate(from, { replace: true })
			})
		}
	}

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		resolver: yupResolver(signupSchema),
	})
	const loginInputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		loginInputRef.current?.focus()
	}, [])
	return (
		<Container maxWidth='xs'>
			<Paper
				elevation={3}
				sx={{ p: 4, mt: 8 }}>
				<Typography
					variant='h4'
					component='h1'
					align='center'
					gutterBottom>
					Вход
				</Typography>

				<Box
					component='form'
					onSubmit={handleSubmit(onSubmit)}
					sx={{ mt: 2 }}>
					{errors.login && (
						<Alert
							severity='error'
							sx={{ mb: 2 }}>
							{errors.login.message}
						</Alert>
					)}

					<TextField
						fullWidth
						margin='normal'
						label='Логин'
						variant='outlined'
						{...register('login')}
						inputRef={loginInputRef}
						error={!!errors.login}
						helperText={errors.login?.message}
						placeholder='Введите логин'
					/>

					<Button
						fullWidth
						type='submit'
						variant='contained'
						sx={{ mt: 3, mb: 2, py: 1.5 }}>
						Войти
					</Button>
				</Box>
			</Paper>
		</Container>
	)
}
