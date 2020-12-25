import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Axios from 'axios';

import { Typography, Container, Paper } from '@material-ui/core';

import ShowList from '../components/ShowList';
import Error from './Error';
import { useUserContext } from '../utils/context';

const Favorites = () => {
	const { userData } = useUserContext();
	const navigate = useNavigate();
	const [fetchedData, setFetchedData] = useState([]);

	useEffect(() => {
		if (!userData.user) {
			navigate('/login');
			return;
		}

		const checkFavs = async () => {
			// Buscando favs do banco
			const getAllFavsRes = await Axios.get(
				'http://localhost:5000/favShows/all/',
				{
					headers: { 'my-auth-token': userData.token },
				}
			);
			// Captura os favoritos se existir algum
			if (getAllFavsRes.data) setFetchedData(getAllFavsRes.data);
		};
		checkFavs();
	}, []);

	const displayResult =
		fetchedData.length === 0 ? (
			<Error text="Sorry, no favorites found" displayButton={false} />
		) : (
			<ShowList data={fetchedData} />
		);
	return (
		<>
			<Container style={{ margin: '3rem auto' }}>
				<Paper elevation={3}>
					<Typography variant="h4" align="center">
						FAVORITES
					</Typography>
				</Paper>
			</Container>
			{displayResult}
		</>
	);
};

export default Favorites;
