import React from 'react';
import {
	AppBar,
	ButtonBase,
	IconButton,
	Toolbar,
	Typography,
	Container,
} from '@material-ui/core';
import { Brightness4, Movie } from '@material-ui/icons';

import HeaderButtons from './HeaderButtons';

const Header = () => {
	const handleMikeflix = () => {
		console.log('title clicked');
		// se estiver logado mandar pra home caso nao esteja na home
	};
	return (
		<>
			<AppBar position="static">
				<Container>
					<Toolbar>
						<div className="title-left">
							<ButtonBase onClick={handleMikeflix}>
								<Movie fontSize="large" />
								<Typography variant="h4">MIKEFLIX</Typography>
							</ButtonBase>
						</div>

						<HeaderButtons />

						<IconButton>
							<Brightness4 fontSize="large" color="inherit" />
						</IconButton>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
};

export default Header;

// Dps fazer media query para telas pequenas apagar o mikeflix e deixar só o icone

// tooltip para os botoes.. talvez
// https://material-ui.com/components/tooltips/