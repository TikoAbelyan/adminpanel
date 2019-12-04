import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

const Nav = ({ state, handleLogout }) => {
  console.log("nav bar", state.success);
  return (
    <nav>
      {/* {console.log("navbar storage", localStorage)} */}
      {/* {localStorage.propagation && console.log("navbar storage", localStorage)} */}
      {console.log(document.cookie)}
      <h3>logo</h3>
      <ul className="unordList">
        <Link to="/">
          <li>Home</li>
        </Link>
        {!state.logedIn && !state.success && !document.cookie ? (
          <Fragment>
            <Menu size="mini" className="menu_item">
              <Link to="/login">
                <Menu.Item>
                  <Button>Log-in</Button>
                </Menu.Item>
              </Link>
              <Link to="/registration">
                <Menu.Item>
                  <Button primary>Registration</Button>
                </Menu.Item>
              </Link>
            </Menu>
          </Fragment>
        ) : (
          <Link to="/" onClick={handleLogout}>
            <Menu.Item>
              <Button primary>Log-out</Button>
            </Menu.Item>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
