import React from 'react';
import { useNavigate } from 'react-router-dom';

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
	const navigate = useNavigate();
	const handleMikeflix = () => {
		navigate('/');
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

						{/* <IconButton>
							<Brightness4 fontSize="large" color="inherit" />
						</IconButton> */}
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
};

export default Header;

// TODO: aprender a fazer um "dark mode" com material ui
