import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

//
import promiseMiddleware from '../api/promiseMiddleware';
import rootReducer from '../reducers';

export default function configureStore(history, initialState) {
  // Installs hooks that always keep react-router and redux store in sync
  const middleware = [thunk, promiseMiddleware, routerMiddleware(history)];
  let store;

 
  store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  ));
 

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}


// const middlewareBuilder = () => {

//   let middleware = {};
//   let universalMiddleware = [thunk,promiseMiddleware];
//   let allComposeElements = [];
  
//   if(process.browser){
//     if(process.env.NODE_ENV === 'production'){
//       middleware = applyMiddleware(...universalMiddleware);
//       allComposeElements = [
//         middleware
//       ]
//     }else{
//       middleware = applyMiddleware(...universalMiddleware);
//       allComposeElements = [
//         middleware,
//         typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
//       ]
//     }
//   }else{
//     middleware = applyMiddleware(...universalMiddleware);
//     allComposeElements = [
//       middleware
//     ]
//   }

//   return allComposeElements;

// }

// const finalCreateStore = compose(...middlewareBuilder())(createStore);

// export default function configureStore(initialState) {
//   const store = finalCreateStore(rootReducer, initialState);

//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('../reducers', () => {
//       const nextRootReducer = require('../reducers');
//       store.replaceReducer(nextRootReducer);
//     });
//   }

//   return store;
// }
