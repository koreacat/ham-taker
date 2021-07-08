import React from 'react';
import './App.css';
import {getManagers, Managers} from './managers';
import {ManagerProvider} from './util/ManagerProvider';

function App() {
	const rootManagers: Managers = getManagers();

	return (
		<ManagerProvider value={rootManagers}>
			<div className="app">
				{rootManagers.sceneManager.scene}
			</div>
		</ManagerProvider>
	);
}

export default App;
