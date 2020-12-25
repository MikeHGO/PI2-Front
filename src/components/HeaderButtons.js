import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, IconButton } from '@material-ui/core';
import { FavoriteRounded } from '@material-ui/icons';

import { useUserContext } from '../utils/context';

const HeaderButtons = () => {
	const navigate = useNavigate();
	const { userData, setUserData } = useUserContext();

	const handleLogin = () => {
		navigate('/login');
	};

	const handleFavorite = () => {
		navigate('/favorites');
	};

	const handleLogout = () => {
		// Limpar userData e remover o jwt
		setUserData({
			token: undefined,
			user: undefined,
		});
		localStorage.setItem('auth-token', '');
		// Redirecionando >>>
		navigate('/login');
	};

	const displayButtons = userData.user ? (
		<>
			<IconButton onClick={handleFavorite}>
				<FavoriteRounded color="secondary" fontSize="large" />
			</IconButton>
			<Button variant="outlined" color="inherit" onClick={handleLogout}>
				Logout
			</Button>
		</>
	) : (
		<Button variant="outlined" color="inherit" onClick={handleLogin}>
			Login
		</Button>
	);

	return displayButtons;
};

export default HeaderButtons;
