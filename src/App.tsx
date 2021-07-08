import React from 'react';
import './App.css';
import { Managers } from './managers';
import { useManagers } from './util/ManagerProvider';

function App() {
	const {sceneManager} = useManagers();

	return (
		<div className="app">
			{sceneManager.getScene()}
		</div>
	);
}

export default App;
