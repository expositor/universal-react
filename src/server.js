import React from 'react';
import express from 'express';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server'
import { RouterContext, match, createMemoryHistory } from 'react-router';

//
import config from '../config'
import routes from './routes';
import configureStore from './store/configureStore';
import { fetchComponentDataBeforeRender } from './api/fetchComponentDataBeforeRender';


const app = express();

const renderFullPage = (html, initialState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <title>Full Stack Web Developer based in London</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; 
        </script>
        <script src="${config.client}:${config.clientPort}/static/bundle.js"></script>
      </body>
    </html>
  `;
}

app.use( (req, res) => {

  match({ routes, location:req.url }, (err, redirectLocation, renderProps) => {

    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (redirectLocation){
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    }

    if(!renderProps){
      return res.status(404).end('Not found');
    }

    const store = configureStore(createMemoryHistory);

    const InitialView = (
      <Provider store={store}>
          <RouterContext {...renderProps} />
      </Provider>
    );

    //This method waits for all render component promises to resolve before returning to browser
    fetchComponentDataBeforeRender(store.dispatch, renderProps.components, renderProps.params)
      .then(html => {
        const componentHTML = renderToString(InitialView);
        const initialState = store.getState();
        res.status(200).end(renderFullPage(componentHTML,initialState))
      })
      .catch(err => {
        console.log(err)
        res.end(renderFullPage("",{}))
      });

  });

});

module.exports = app;