import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, match, browserHistory } from 'react-router';

//
import "../styles/index.css";
import routes from './routes';
import configureStore from './store/configureStore';
import { fetchComponentDataBeforeRender } from './api/fetchComponentDataBeforeRender';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(browserHistory, initialState);
const history = syncHistoryWithStore(browserHistory, store);
const rootElement = document.getElementById('root');

/**
 * Callback function handling frontend route changes.
 */
function onUpdate() {
  // Prevent duplicate fetches when first loaded.
  // Explanation: On server-side render, we already have __INITIAL_STATE__
  // So when the client side onUpdate kicks in, we do not need to fetch twice.
  // We set it to null so that every subsequent client-side navigation will
  // still trigger a fetch data.
  // Read more: https://github.com/choonkending/react-webpack-node/pull/203#discussion_r60839356
  if (window.__INITIAL_STATE__ !== null) {
    window.__INITIAL_STATE__ = null;
    return;
  }

  const { components, params } = this.state;

  fetchComponentDataBeforeRender(store.dispatch, components, params);
}

match({ history, routes }, (error, redirectLocation, renderProps) => {
	render(
		<Provider store={store}>
			<Router {...renderProps} onUpdate={onUpdate}>
				
			</Router>
		</Provider>,
	  document.getElementById('root')
	)
})	

if (process.env.NODE_ENV !== 'production') {
  //require('../server/devtools')(store);
}
