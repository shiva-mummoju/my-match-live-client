import React, { Component } from "react";

import "./header.css";
class Header extends Component {
  render() {
    return (
<nav className="navbar navbar-inverse noMarginBottom" >
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand" href="/home">My Match Live</a>
    </div>
  </div>
</nav>
    );
  }
}

export default Header;
