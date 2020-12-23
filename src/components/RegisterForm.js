import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Axios from 'axios';

import {
	TextField,
	Button,
	Typography,
	FormControl,
	InputAdornment,
	InputLabel,
	IconButton,
	OutlinedInput,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { useUserContext } from '../utils/context';

const RegisterForm = () => {
	const navigate = useNavigate();
	const { setUserData } = useUserContext();

	const [formValues, setFormValues] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		username: '',
	});

	const [showPassword, setShowPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState();

	const handleChange = (prop) => (event) => {
		setFormValues({ ...formValues, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { email, password } = formValues;
			// Registrando
			await Axios.post('http://localhost:5000/users/register', formValues);
			// Logando
			const loginRes = await Axios.post('http://localhost:5000/users/login', {
				email,
				password,
			});
			setUserData({
				token: loginRes.data.token,
				user: loginRes.data.user,
			});
			localStorage.setItem('auth-token', loginRes.data.token);
			// Apos logar (setup do userData e auth-token), redirecionar
			navigate('/');
		} catch (err) {
			err.response.data.msg && setErrorMessage(err.response.data.msg);
		}
	};

	return (
		<form type="form" onSubmit={handleSubmit} className="form-container">
			<Typography variant="h4" align="center">
				REGISTER
			</Typography>
			{errorMessage && (
				<Alert variant="outlined" severity="error" style={{ width: 244 }}>
					{errorMessage}
				</Alert>
			)}
			<TextField
				label="Email"
				type="text"
				required
				variant="outlined"
				value={formValues.email}
				onChange={handleChange('email')}
				fullWidth
			/>
			<TextField
				label="Username"
				type="text"
				required
				variant="outlined"
				value={formValues.username}
				onChange={handleChange('username')}
				fullWidth
			/>
			<FormControl variant="outlined">
				<InputLabel htmlFor="password">Password</InputLabel>
				<OutlinedInput
					id="password"
					type={showPassword ? 'text' : 'password'}
					value={formValues.password}
					onChange={handleChange('password')}
					endAdornment={
						<InputAdornment position="end">
							<IconButton onClick={handleClickShowPassword} edge="end">
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					}
					labelWidth={70}
					required
				/>
			</FormControl>
			<FormControl variant="outlined">
				<InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
				<OutlinedInput
					id="confirmPassword"
					type={showPassword ? 'text' : 'password'}
					value={formValues.confirmPassword}
					onChange={handleChange('confirmPassword')}
					endAdornment={
						<InputAdornment position="end">
							<IconButton onClick={handleClickShowPassword} edge="end">
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					}
					labelWidth={70}
					required
				/>
			</FormControl>
			<Button variant="outlined" color="inherit" type="submit">
				REGISTER
			</Button>
		</form>
	);
};

export default RegisterForm;
