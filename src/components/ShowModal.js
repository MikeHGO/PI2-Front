import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Typography } from '@material-ui/core';
import { useModalContext } from '../utils/context';

// Setup de estilos para que a modal seja dinamicamente redimencionada de acordo com o tamanho da tela (deu trabalho...)
const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		// backgroundColor: theme.palette.background.paper,
		backgroundColor: 'whitesmoke',
		borderRadius: '4px',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2),
		height: '80%',
		maxWidth: '80%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '1rem',
		overflow: 'auto',
		flexWrap: 'wrap',
		scrollbarWidth: 'thin',
	},
}));

const ShowModal = () => {
	const classes = useStyles();
	// Controlando a modal atravez do custom hook useModalContext
	const {
		isModalOpen,
		setIsModalOpen,
		modalContent,
		setModalContent,
	} = useModalContext();

	const handleClose = () => {
		setIsModalOpen(false);
	};

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={isModalOpen}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={isModalOpen}>
					{modalContent.name && (
						<div className={classes.paper}>
							<img
								src={modalContent.image.original}
								alt="cover"
								className="modal-image"
							/>
							<div className="modal-info">
								<Typography
									variant="h4"
									align="center"
									style={{ marginBottom: '1rem' }}
								>
									{modalContent.name}
								</Typography>
								<Typography variant="subtitle1">
									Genres: {modalContent.genres}
								</Typography>
								<Typography variant="subtitle1">
									Language: {modalContent.language}
								</Typography>
								<Typography variant="subtitle1">
									Premiered: {modalContent.premiered}
								</Typography>
								<Typography variant="subtitle1">
									Rating: {modalContent.rating}
								</Typography>
								<Typography variant="subtitle1">
									Runtime: {modalContent.runtime}
								</Typography>
								<Typography variant="subtitle1" align="justify">
									Summary: {modalContent.summary}
								</Typography>
							</div>
						</div>
					)}
				</Fade>
			</Modal>
		</div>
	);
};

export default ShowModal;
