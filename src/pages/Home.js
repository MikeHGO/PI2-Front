import React from 'react';

import {
	Container,
	IconButton,
	OutlinedInput,
	InputAdornment,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import ShowList from '../components/ShowList';

const Home = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('submit search');

		// Pesquisar na api e passar dados pro ShowCardList
	};

	return (
		<>
			<Container>
				<form type="form" onSubmit={handleSubmit} className="homeForm">
					<OutlinedInput
						placeholder="Search TV Shows"
						autoFocus={true}
						fullWidth
						endAdornment={
							<InputAdornment position="end">
								<IconButton type="submit">
									<Search />
								</IconButton>
							</InputAdornment>
						}
					/>
				</form>
			</Container>
			<ShowList />
		</>
	);
};

export default Home;

// https://material-ui.com/api/outlined-input/#outlinedinput-api
