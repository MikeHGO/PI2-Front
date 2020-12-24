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

const ShowCard = ({ showInfo }) => {
	const { setIsModalOpen, setModalContent } = useModalContext();

	// usar o setIsLoadingCardInfo no inicio do fetch com o bd para impedir triggers enquando a operacao acontece
	const [isLoadingCardInfo, setIsLoadingCardInfo] = useState(false);

	// receber valor inicial do bd useState(userFaved)
	const [isFavorited, setIsFavorited] = useState(false);

	const icon = isFavorited ? (
		<Favorite color="secondary" fontSize="large" />
	) : (
		<Favorite color="primary" fontSize="large" />
	);

	// Alterar o conteudo da modal e dps exibi
	const handleCardClick = () => {
		setModalContent(showInfo);
		setIsModalOpen(true);
	};

	const handleFavoriteClick = (e) => {
		// Impede o click de elementos atras
		e.stopPropagation();

		// Desativa o button enquanto o fetch esta ocorrendo
		// setIsLoadingCardInfo(true);

		// fetch

		setIsFavorited(!isFavorited);
		// setIsLoadingCardInfo(!isLoadingCardInfo);

		// setIsLoadingCardInfo(false);
	};

	return (
		<>
			<Card style={{ width: 210 }}>
				<div className="icon-box">
					<CardActionArea onClick={handleCardClick} style={{ height: 350 }}>
						<CardMedia
							image={showInfo.image.medium || showInfo.image}
							style={{ height: 295 }}
						/>

						<div className="card-title-box">
							<div className="card-title">
								<Typography variant="subtitle1" align="center">
									{showInfo.name}
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
