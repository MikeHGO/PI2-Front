import React, { useState } from 'react';
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

const ShowCard = () => {
	const { isModalOpen, setIsModalOpen, setModalContent } = useModalContext();

	// usar o setIsLoadingCardInfo no inicio do fetch com o bd para impedir triggers enquando a operacao acontece
	const [isLoadingCardInfo, setIsLoadingCardInfo] = useState(false);

	// Poster e titulo recebidos como prop apos fetch no input da home passados para o ShowCardList e consequentemente para o ShowCard... (usar defaultPropTypes ou short circuiut || para evitar acesso undefined )
	const imageMedium =
		'http://static.tvmaze.com/uploads/images/medium_portrait/190/476117.jpg';
	const name = 'The Game Of Thrones';

	// receber valor inicial do bd useState(userFaved)
	const [isFavorited, setIsFavorited] = useState(false);

	const icon = isFavorited ? (
		<Favorite color="secondary" fontSize="large" />
	) : (
		<Favorite color="primary" fontSize="large" />
	);

	// Alterar o conteudo da modal e dps exibi
	const handleCardClick = () => {
		console.log('Card click');
		setModalContent({ name });
		setIsModalOpen(true);
	};

	const handleFavoriteClick = (e) => {
		// Impede o click de elementos atras
		e.stopPropagation();
		console.log('Fav click!');

		// Desativa o button enquanto o fetch esta ocorrendo
		// setIsLoadingCardInfo(true);

		// fetch

		setIsFavorited(!isFavorited);
		// setIsLoadingCardInfo(!isLoadingCardInfo);
		console.log('isLoadingCardInfo: ', isLoadingCardInfo);

		// setIsLoadingCardInfo(false);
	};

	// medium cover 210 x 295
	return (
		<>
			<Card style={{ width: 210 }}>
				<div className="icon-box">
					<CardActionArea onClick={handleCardClick} style={{ height: 350 }}>
						<CardMedia
							image={imageMedium}
							title={name}
							style={{ height: 295 }}
						/>

						<div className="card-title-box">
							<div className="card-title">
								<Typography variant="subtitle1" align="center">
									The Game Of Thrones
								</Typography>
							</div>
						</div>
					</CardActionArea>
					<IconButton
						onClick={handleFavoriteClick}
						disabled={isLoadingCardInfo}
						className="icon"
					>
						{icon}
					</IconButton>

					{isLoadingCardInfo && (
						<CircularProgress size={60} className="icon-progress" />
					)}
				</div>
			</Card>
		</>
	);
};

export default ShowCard;
