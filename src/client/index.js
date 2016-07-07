import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, match, browserHistory } from 'react-router';

//
import configureStore from '../common/store/configureStore';
import routes from '../common/routes';
import "../../styles/index.css";


const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);
const rootElement = document.getElementById('root');

match({ history, routes }, (error, redirectLocation, renderProps) => {
render(

	<Provider store={store}>
		<Router {...renderProps} />
  </Provider>,
  document.getElementById('root')
)

})	


if (process.env.NODE_ENV !== 'production') {
  //require('../server/devtools')(store);
}
