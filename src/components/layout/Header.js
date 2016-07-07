import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {

  render() {
    return (
    <div className="masthead">
			<div className="container">
			  <h3 className="masthead-title">
			    <Link to="/" title="Home">Callum Rimmer</Link>
			    <small>Full Stack Web Developer based in London</small>
			  </h3>
			</div>
		</div>
    );
  }
}

export default Header;