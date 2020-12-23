import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography, Container } from '@material-ui/core';

import ShowList from '../components/ShowList';
import { useUserContext } from '../utils/context';

const Favorites = () => {
	const { userData } = useUserContext();
	const navigate = useNavigate();
	useEffect(() => {
		if (!userData.user) navigate('/login');
	}, []);
	return (
		<>
			<Container style={{ margin: '3rem 0' }}>
				<Typography variant="h4">UserName favorites:</Typography>
			</Container>
			<ShowList />
		</>
	);
};

export default Favorites;
