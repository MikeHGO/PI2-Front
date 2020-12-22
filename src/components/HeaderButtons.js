import React, { useState } from 'react';

import { Button, IconButton } from '@material-ui/core';
import { FavoriteRounded } from '@material-ui/icons';

const HeaderButtons = () => {
	// Pegar do context
	const [isUserAuthenticated, setIsUserAuthenticated] = useState(true);

	const handleLogin = () => {
		console.log('login');
		// usar o router navigate
	};

	const handleLogout = () => {
		console.log('logout');
		// deslogar e navigate LoginRegister
	};

	const handleFavorite = () => {
		console.log('handleFavorite');
		// usar o router navigate
	};
	const displayButtons = isUserAuthenticated ? (
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
