import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Axios from 'axios';

import {
	Container,
	IconButton,
	OutlinedInput,
	InputAdornment,
	Paper,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

import ShowList from '../components/ShowList';
import { useUserContext } from '../utils/context';
import Error from './Error';

const Home = () => {
	const { userData, getUser } = useUserContext();
	const navigate = useNavigate();
	const [searchedText, setSearchedText] = useState('');
	const [fetchedData, setFetchedData] = useState([]);

	const [errorMessage, setErrorMessage] = useState(
		'Welcome to MIKEFLIX! Type the show title in the search bar then submit'
	);

	useEffect(async () => {
		await getUser();
		if (!userData.user) navigate('/login');
		console.log(userData.user);
		console.log('!!userdata:', !!userData.user);
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
					<Paper elevation={3}>
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
					</Paper>
				</form>
			</Container>
			{displayResult}
		</>
	);
};

export default Home;
