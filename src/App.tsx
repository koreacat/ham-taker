import React from 'react';
import './App.css';
import {getManagers, Managers} from './managers';
import Scene from './scene';
import {ManagerProvider} from './util/ManagerProvider';

function App() {
	const rootManagers: Managers = getManagers();

	return (
		<ManagerProvider value={rootManagers}>
			<div className="app">
				<Scene/>
			</div>
		</ManagerProvider>
	);
}

export default App;
