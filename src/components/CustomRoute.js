import React, { useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';

import { useUserContext } from '../utils/context';

const CustomRoute = ({ navigateTo, path, component: Component, ...props }) => {
	const { userData, getUser } = useUserContext();
	const navigate = useNavigate();

	useEffect(async () => {
		await getUser();
	}, []);

	// Se nao houver um user redirecionar
	if (!userData.user) return navigate(navigateTo);

	return <Route path={path} element={<Component />} />;
};

export default CustomRoute;
