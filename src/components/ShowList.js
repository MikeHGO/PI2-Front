import { Container } from '@material-ui/core';
import React from 'react';
import ShowCard from './ShowCard';
import ShowModal from './ShowModal';

const ShowList = () => {
	// receber data das props e exibir ShowCards passando as props
	const shows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	return (
		<Container>
			<ShowModal />
			<div className="card-list">
				{shows.map((show, index) => (
					<ShowCard key={index} />
				))}
			</div>
		</Container>
	);
};

export default ShowList;
