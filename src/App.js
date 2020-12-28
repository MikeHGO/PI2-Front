import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import LoginRegister from './pages/LoginRegister';
import Error from './pages/Error';
import { ModalProvider, useUserContext } from './utils/context';
// import CustomRoute from './components/CustomRoute';

import './App.css';

function App() {
	const { getUser } = useUserContext();

	useEffect(async () => {
		await getUser();
	}, []);

	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<Routes>
					<ModalProvider>
						<Route path="/" element={<Home />} />
						{/* <CustomRoute navigateTo="/login" path="/" component={Home} /> */}
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
