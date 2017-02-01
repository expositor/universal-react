# Universal React

[![Greenkeeper badge](https://badges.greenkeeper.io/expositor/universal-react.svg)](https://greenkeeper.io/)

[![Dependency Status][dep-status-img]][dep-status-link]
[![devDependency Status][dev-dep-status-img]][dev-dep-status-link]

[dep-status-img]: https://david-dm.org/expositor/universal-react.svg
[dep-status-link]: https://david-dm.org/expositor/universal-react
[dev-dep-status-img]: https://david-dm.org/expositor/universal-react/dev-status.svg
[dev-dep-status-link]: https://david-dm.org/expositor/universal-react#info=devDependencies

This is a refactoring and up-to-date version of the portfolio boilerplate made by [caljrimmer/portfolio-redux-app](https://github.com/caljrimmer/portfolio-redux-app). It's also inspired by [choonkending/react-webpack-node](https://github.com/choonkending/react-webpack-node) and [erikras/react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example).

Features include:

* Universal Rendering 
* Express
* React
* Redux
* React Hot Loading
* Redux Devtools ([Chrome Extension Only](https://github.com/zalmoxisus/redux-devtools-extension)) 

#### TODO:

~~Add support for production mode.~~

### Geting Started
```
npm install
```

Go to your config folder:
```
module.exports = Object.assign({

	host: 'localhost', <--- localhost || http://example.com
	port: 3000, <--- default port

	client: 'http://localhost', <--- port for dev client bundle
	clientPort: 1337, <--- the port for hot reloading

})
```
To start development mode:
```
npm start
```

To start production mode:
```
npm run production
```