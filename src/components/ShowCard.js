import React, { useState, useEffect } from 'react';

import Axios from 'axios';

import { Favorite } from '@material-ui/icons';
import {
	IconButton,
	Typography,
	Card,
	CardActionArea,
	CardMedia,
	CircularProgress,
} from '@material-ui/core';

import { useModalContext } from '../utils/context';
import { useUserContext } from '../utils/context';

const ShowCard = ({ showInfo: show }) => {
	const { setIsModalOpen, setModalContent } = useModalContext();
	const { userData } = useUserContext();
	const [favId, setFavId] = useState();
	const [isFavorited, setIsFavorited] = useState(false);
	const [isFetchingFav, setIsFetchingFav] = useState(false);

	const icon = isFavorited ? (
		<Favorite color="secondary" fontSize="large" />
	) : (
		<Favorite color="primary" fontSize="large" />
	);

	useEffect(() => {
		const checkFavs = async () => {
			setFavId(null);
			setIsFavorited(false);
			setIsFetchingFav(false);
			// Buscando favs do banco
			const getAllFavsRes = await Axios.get(
				'http://localhost:5000/favShows/all/',
				{
					headers: { 'my-auth-token': userData.token },
				}
			);
			// Se nao houver favoritos retornar
			if (!getAllFavsRes.data) return;
			// Checando no array de favoritos se o show foi favoritado
			const favoritedShow = getAllFavsRes.data.find(
				({ show: favShow }) => favShow.id === show.id
			);
			if (!favoritedShow) return;

			// Com o show favoritado setar id da entrada no banco e o icone de favorito
			setFavId(favoritedShow._id);
			setIsFavorited(true);
		};
		checkFavs();
	}, [show.id]);

	// Alterar o conteudo da modal e dps exibi
	const handleCardClick = () => {
		setModalContent(show);
		setIsModalOpen(true);
	};

	const handleFavoriteClick = async (e) => {
		// Impede o click de elementos atras
		e.stopPropagation();

		const token = localStorage.getItem('auth-token');

		// DELETAR
		if (favId && isFavorited && token) {
			try {
				// Desativa o button enquanto o fetch esta ocorrendo
				setIsFetchingFav(true);
				await Axios.delete('http://localhost:5000/favShows/', {
					params: { favId },
					headers: { 'my-auth-token': token },
				});
				setIsFetchingFav(false);
				setIsFavorited(!isFavorited);
			} catch (err) {
				console.log(err);
			}
		} else if (!isFavorited && token) {
			// ADICIONAR
			try {
				// Desativa o button enquanto o fetch esta ocorrendo
				setIsFetchingFav(true);
				const adicionado = await Axios.post(
					'http://localhost:5000/favShows/',
					show,
					{
						headers: { 'my-auth-token': token },
					}
				);
				setIsFetchingFav(false);
				setIsFavorited(!isFavorited);
				if (adicionado.data._id) setFavId(adicionado.data._id);
			} catch (err) {
				console.log(err);
			}
		}
	};
	return (
		<>
			<Card style={{ width: 210 }}>
				<div className="icon-box">
					<CardActionArea onClick={handleCardClick} style={{ height: 350 }}>
						<CardMedia image={show.image.medium} style={{ height: 295 }} />

						<div className="card-title-box">
							<div className="card-title">
								<Typography variant="subtitle1" align="center">
									{show.name}
								</Typography>
							</div>
						</div>
					</CardActionArea>

					<IconButton
						onClick={handleFavoriteClick}
						disabled={isFetchingFav}
						className="icon"
					>
						{icon}
					</IconButton>
					{/* Add e del eh tao rapido que o loading nem aparece ;<.. */}
					{isFetchingFav && (
						<CircularProgress size={60} className="icon-progress" />
					)}
				</div>
			</Card>
		</>
	);
};

export default ShowCard;
