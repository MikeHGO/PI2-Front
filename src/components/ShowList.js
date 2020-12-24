import { Container } from '@material-ui/core';
import React from 'react';
import ShowCard from './ShowCard';
import ShowModal from './ShowModal';

const ShowList = ({ data }) => {
	return (
		<Container style={{ marginBottom: '3rem' }}>
			<ShowModal />
			<div className="card-list">
				{data.map(({ show }, index) => {
					// Capturando informacoes do show e tratando falhas
					const showInfo = {
						id: show.id || 'Not found',
						genres: show.genres ? show.genres.join(', ') : 'Not found',
						name: show.name || 'Not found',
						language: show.language || 'Not found',
						premiered: show.premiered || 'Not found',
						runtime: show.runtime
							? show.runtime.toString() + 'min'
							: 'Not found',
						rating: show.rating.average || 'Not found',
						summary: show.summary
							? show.summary.replace(/\s*\<.*?\>\s*/g, '')
							: 'Not found',
						image:
							show.image ||
							'https://media.giphy.com/media/3zhxq2ttgN6rEw8SDx/giphy.gif',
					};
					return <ShowCard key={show.id || index} showInfo={showInfo} />;
				})}
			</div>
		</Container>
	);
};

export default ShowList;
