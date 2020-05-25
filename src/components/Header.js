import React from "react";
import "../scss/Header.scss";

class Header extends React.Component {
  render() {
    return (
      <div className="icon-head">
        <div className="head-inner-bar">
          <img className="head-logo" src="logo192.png" alt="logo" />
          <div className="title-div">
            <p className="title-text">Fork</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
