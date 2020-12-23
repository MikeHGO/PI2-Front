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
		if (userData.user) navigate('/');
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

// box https://material-ui.com/components/paper/
// fields https://material-ui.com/components/text-fields/
// register btn https://material-ui.com/components/progress/

// error msg https://material-ui.com/components/snackbars/
// alert https://material-ui.com/components/alert/
// divisoria https://material-ui.com/components/dividers/
