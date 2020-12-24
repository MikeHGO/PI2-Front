import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Axios from 'axios';

import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import LoginRegister from './pages/LoginRegister';
import Error from './pages/Error';
import { ModalProvider, useUserContext } from './utils/context';

import './App.css';

function App() {
	const { setUserData } = useUserContext();

	// Se houver um auth-token no localStorage pegar as informacoes desse user
	useEffect(() => {
		const checkLoggedIn = async () => {
			let token = localStorage.getItem('auth-token');

			// Caso não exista um token, criar um vazio
			if (token === null) {
				localStorage.setItem('auth-token', '');
				token = '';
			}
			// Consultando se tem um user logado
			// Axios.post(url, data, config)
			const tokenRes = await Axios.post(
				'http://localhost:5000/users/tokenIsValid',
				null,
				{ headers: { 'my-auth-token': token } }
			);

			// Se houver um user logado -> setUserData no UserContext pra todo mundo!!!
			if (tokenRes.data) {
				const userRes = await Axios.get('http://localhost:5000/users/', {
					headers: { 'my-auth-token': token },
				});
				setUserData({
					token,
					user: userRes.data,
				});
			}
		};
		checkLoggedIn();
	}, []);

	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<Routes>
					<ModalProvider>
						<Route path="/" element={<Home />} />
					</ModalProvider>
					<ModalProvider>
						<Route path="/favorites" element={<Favorites />} />
					</ModalProvider>
					<Route path="login" element={<LoginRegister />} />
					<Route
						path="*"
						element={<Error text={'PAGE NOT FOUND'} displayButton={true} />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
