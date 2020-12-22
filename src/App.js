import Header from './components/Header';
import Error from './pages/Error';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import ShowModal from './components/ShowModal';
import { ModalProvider } from './utils/context';

import './App.css';

function App() {
	return (
		<div className="App">
			<Header />
			<ModalProvider>
				<Home />
			</ModalProvider>
			{/* <Favorites /> */}
			{/* <LoginRegister /> */}
			{/* <Error /> */}
		</div>
	);
}

export default App;
/*
Aprender router v6
usar navigate para redimencionar
colocar o Header no top fixo
pagina Error para rotas nao encontradas "*"
https://github.com/ReactTraining/react-router/blob/dev/docs/advanced-guides/migrating-5-to-6.md
*/
