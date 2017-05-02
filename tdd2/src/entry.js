import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import { AppContainer } from 'react-hot-loader';

import './style.less';

// let a = <h1>Hello react!</h1>

const render = () => {
	ReactDOM.render(
		<AppContainer>
			<App a="123"/>
		</AppContainer>, document.getElementById('app'));	
};

render();

// Hot Module Replacement API
if(module.hot){module.hot.accept('./app.jsx', render);}