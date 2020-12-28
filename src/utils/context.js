import React, { useState, createContext, useContext } from 'react';

import Axios from 'axios';

// Provider e Context para acessar e editar os dados do User
const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [userData, setUserData] = useState({
		token: undefined,
		user: undefined,
	});

	// Se houver um auth-token no localStorage pegar as informacoes desse user
	const getUser = async () => {
		// Caso ja exista um user setado retornar
		if (!!userData.user) return;

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

	return (
		<UserContext.Provider
			value={{
				userData,
				setUserData,
				getUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

const useUserContext = () => {
	return useContext(UserContext);
};

export { UserProvider, useUserContext };

// Provider e Context para acessar e editar o conteudo da ShowModal
const ModalContext = createContext();

const ModalProvider = ({ children }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState({});

	return (
		<ModalContext.Provider
			value={{
				isModalOpen,
				setIsModalOpen,
				modalContent,
				setModalContent,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};

const useModalContext = () => {
	return useContext(ModalContext);
};

export { ModalProvider, useModalContext };
