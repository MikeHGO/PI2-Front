import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Paper } from '@material-ui/core';

import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import { useUserContext } from '../utils/context';

// Dois formularios juntos para maior praticidade, menos clicks e menos transicoes
export default function LoginRegister() {
	const { userData } = useUserContext();
	const navigate = useNavigate();

	useEffect(() => {
		// Nao esta redirecionando !? !? !?
		if (!!userData.user) navigate('/');
		console.log(!!userData.user);
	}, []);

	return (
		<>
			<Container styles={{ border: '1 solid magenta' }}>
				<div className="input-container">
					<Paper elevation={3}>
						<LoginForm />
					</Paper>
					<Paper elevation={3}>
						<RegisterForm />
					</Paper>
				</div>
			</Container>
		</>
	);
}
