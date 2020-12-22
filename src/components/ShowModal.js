import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { useModalContext } from '../utils/context';

// Setup de estilos para que a modal seja dinamicamente redimencionada de acordo com o tamanho da tela (deu trabalho...)
const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
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
	// Controlando a modal atravez do custom hook useModalContext
	const {
		isModalOpen,
		setIsModalOpen,
		modalContent,
		setModalContent,
	} = useModalContext();
	const classes = useStyles();

	// Fecha a modal e limpa o conteudo
	const handleClose = () => {
		setIsModalOpen(false);
		setModalContent({});
	};
	console.log(modalContent);

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
					<div className={classes.paper}>
						<img
							src="http://static.tvmaze.com/uploads/images/original_untouched/190/476117.jpg"
							alt="cover"
							srcset=""
							className="modal-image"
						/>
						<div className="modal-info">
							<p>{modalContent.name || 'Not Found'}</p>
							<p>Lorem ipsum</p>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
								est, laboriosam iusto laborum totam maiores quibusdam distinctio
								quia animi aut consequuntur necessitatibus optio quod
								reprehenderit id repellat accusamus facilis, commodi odit
								voluptatibus. Nesciunt incidunt aliquid eum fuga voluptates.
								Adipisci vitae molestias consequuntur ea sequi nemo voluptates,
								voluptatibus recusandae sunt obcaecati alias assumenda
								necessitatibus id autem optio asperiores consequatur ipsum sit
								numquam nobis cumque! Officiis quis et accusantium possimus,
								enim alias delectus sit neque id porro corporis? Cum ullam
								possimus beatae adipisci sint! Consectetur eveniet, dicta
								consequatur fugiat animi, incidunt modi repellendus iste
								voluptate eum a quisquam. Aut accusamus est consectetur ratione
								necessitatibus libero a nostrum? Illo perferendis in, quia
								saepe, tenetur sit repellat eaque quidem dolore natus, mollitia
								quos. Ea magni debitis quis nam doloribus at. Consequatur ea
								nobis voluptatem quia similique labore in tenetur at
								exercitationem est maxime natus enim, ratione aperiam?
								Repellendus praesentium tempore optio dolor odit consectetur
								nihil ut facere magnam recusandae necessitatibus mollitia neque
								aliquid molestias laborum voluptatibus exercitationem, dolorum
								quisquam asperiores possimus doloremque! Placeat recusandae quo
								dignissimos numquam ratione quos ab iusto, debitis, nisi quidem
								eos ducimus deserunt tempora! Porro nemo obcaecati ratione
								recusandae dignissimos harum autem! Eos tempora voluptates
								quidem quasi quod at. Labore!
							</p>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default ShowModal;

// Loading https://material-ui.com/components/backdrop/
// nota pessoal https://material-ui.com/components/rating/
