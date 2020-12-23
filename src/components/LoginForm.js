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

const LoginForm = () => {
	const navigate = useNavigate();
	const { setUserData } = useUserContext();

	const [formValues, setFormValues] = useState({
		email: '',
		password: '',
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
			const loginRes = await Axios.post(
				'http://localhost:5000/users/login',
				formValues
			);
			setUserData({
				token: loginRes.data.token,
				user: loginRes.data.user,
			});
			localStorage.setItem('auth-token', loginRes.data.token);
			// Apos logar (setup do userData e auth-token), redirecionar
			navigate('/');
		} catch (err) {
			// Se houver um erro exibir
			err.response.data.msg && setErrorMessage(err.response.data.msg);
		}
	};

	// autoFocus somente no login pois o registro provavelmente sera feito apenas uma vez e o login multiplas
	return (
		<>
			<form type="form" onSubmit={handleSubmit} className="form-container">
				<Typography variant="h4" align="center">
					LOGIN
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
					autoFocus
					value={formValues.email}
					onChange={handleChange('email')}
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
				<Button variant="outlined" color="inherit" type="submit">
					Login
				</Button>
			</form>
		</>
	);
};

export default LoginForm;
