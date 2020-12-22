import React, { useState, createContext, useContext } from 'react';
import Axios from 'axios';

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [userData, setUserData] = useState({
		token: undefined,
		user: undefined,
	});

	// Checar se user esta logado e talvez redirecionar
	const checkLoggedIn = async (redirect, pageToRedirect) => {};

	return (
		<UserContext.Provider
			value={{
				userData,
				setUserData,
				checkLoggedIn,
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

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState({});

	function printmodal() {
		console.log('funcionou!');
	}

	return (
		<ModalContext.Provider
			value={{
				isModalOpen,
				setIsModalOpen,
				modalContent,
				setModalContent,
				printmodal,
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

/*
UserProvider para todos
ModalProvider apenas para Home e Favorites
Talvez seja melhor um unico provider..., mas vou insistir nessa divisao
*/
