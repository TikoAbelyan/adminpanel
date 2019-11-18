import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

const Nav = ({ state, handleLogout }) => {
  console.log("nav bar", state.success);
  return (
    <nav>
      {/* {console.log("navbar storage", localStorage)} */}
      {localStorage.propagation && console.log("navbar storage", localStorage)}
      <h3>logo</h3>
      <ul className="unordList">
        <Link to="/">
          <li>Home</li>
        </Link>
        {!state.logedIn && !state.success ? (
          <Fragment>
            <Link to="/login">
              <li>Login</li>
            </Link>
            <Link to="/registration">
              <li>Registration</li>
            </Link>
          </Fragment>
        ) : (
          <Link to="/" onClick={handleLogout}>
            <li>Logout</li>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
