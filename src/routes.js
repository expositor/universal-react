import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./containers/App";

//Redux Smart
import AboutPage from "./containers/AboutPage";
import HomePage from "./containers/HomePage";

//Redux Dumb
import PortfolioPage from "./components/Portfolio";
import ServicesPage from "./components/Services";
import error404 from "./components/404";

export default ( store ) => {
	function onEnter()
	{
		console.log(store.getState())
	}
    return (
	  <Route  path="/" component={App}>
	      <IndexRoute component={HomePage} />
	      <Route path="portfolio" onEnter={onEnter} component={PortfolioPage} />
	      <Route path="services" component={ServicesPage} />
	      <Route path="about" component={AboutPage} />
	      <Route path="*" component={error404}/>
	  </Route>
	)
}
