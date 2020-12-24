import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Axios from 'axios';

import {
	Container,
	IconButton,
	OutlinedInput,
	InputAdornment,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

import ShowList from '../components/ShowList';
import { useUserContext } from '../utils/context';
import Error from './Error';

const Home = () => {
	const { userData } = useUserContext();
	const navigate = useNavigate();
	const [searchedText, setSearchedText] = useState('');
	const [fetchedData, setFetchedData] = useState([]);

	const [errorMessage, setErrorMessage] = useState(
		'Welcome to MIKEFLIX! Type the show title in the search bar then submit'
	);

	useEffect(() => {
		// useEffect da Home esta pegando o userData antes do App defini-lo.. como eu corrijo isso!?
		if (!userData.user) navigate('/login');
		console.log(userData.user);
	}, []);

	const handleChange = (e) => {
		setSearchedText(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await Axios.get(
			`http://api.tvmaze.com/search/shows?q=${searchedText}`
		);

		if (res.data) setFetchedData(res.data);
		setErrorMessage('Sorry, no shows found with that title');
	};

	const displayResult =
		fetchedData.length === 0 ? (
			<Error text={errorMessage} displayButton={false} />
		) : (
			<ShowList data={fetchedData} />
		);

	return (
		<>
			<Container>
				<form type="form" onSubmit={handleSubmit} className="homeForm">
					<OutlinedInput
						placeholder="Search TV Shows"
						autoFocus={true}
						value={searchedText}
						onChange={handleChange}
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
			{displayResult}
		</>
	);
};

export default Home;

// https://material-ui.com/api/outlined-input/#outlinedinput-api
