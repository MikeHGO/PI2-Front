import React, { useState, createContext, useContext } from 'react';

// Provider e Context para acessar e editar os dados do User
const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [userData, setUserData] = useState({
		token: undefined,
		user: undefined,
	});

	return (
		<UserContext.Provider
			value={{
				userData,
				setUserData,
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
