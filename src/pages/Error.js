import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Typography, Button, Paper } from '@material-ui/core';
import { ErrorOutline, Movie } from '@material-ui/icons';

// Componente com conteudo de text e botao passados como props
const Error = ({ text, displayButton }) => {
	return (
		<>
			<Container>
				<Paper elevation={3}>
					<div className="error-container">
						<Typography variant="h3" align="center">
							<ErrorOutline fontSize="large" />
							{text}
						</Typography>
						{displayButton && (
							<>
								<Typography variant="h3" align="center">
									RETURN TO
								</Typography>

								<Link to="/" style={{ color: 'inherit' }}>
									<Button variant="outlined" color="inherit">
										<Movie fontSize="large" />
										<Typography variant="h4">MIKEFLIX</Typography>
									</Button>
								</Link>
							</>
						)}
					</div>
				</Paper>
			</Container>
		</>
	);
};

export default Error;
