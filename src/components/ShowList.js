import { Container } from '@material-ui/core';
import React from 'react';
import ShowCard from './ShowCard';
import ShowModal from './ShowModal';

const ShowList = ({ data }) => {
	const imageNotFound =
		'https://media.giphy.com/media/3zhxq2ttgN6rEw8SDx/giphy.gif';

	const genresChecker = (item) => {
		if (typeof item === 'string') return item;
		if (item.length) {
			return item.join(', ');
		} else {
			return 'Not found';
		}
	};

	const runtimeChecker = (item) => {
		if (typeof item === 'string') return item;
		if (item) {
			return item.toString() + 'min';
		} else {
			return 'Not found';
		}
	};
	return (
		<Container style={{ marginBottom: '3rem' }}>
			<ShowModal />
			<div className="card-list">
				{data.map(({ show }, index) => {
					// Capturando informacoes do show e tratando falhas
					const showInfo = {
						id: show.id || 'Not found',
						genres: genresChecker(show.genres),
						name: show.name || 'Not found',
						language: show.language || 'Not found',
						premiered: show.premiered || 'Not found',
						runtime: runtimeChecker(show.runtime),
						rating: show.rating.average || 'Not found',
						// regex para corrigir sujeira na sinopse
						summary: show.summary
							? show.summary.replace(/\s*\<.*?\>\s*/g, '')
							: 'Not found',
						image: show.image || {
							medium: imageNotFound,
							original: imageNotFound,
						},
					};
					return <ShowCard key={index} showInfo={showInfo} />;
				})}
			</div>
		</Container>
	);
};

export default ShowList;
