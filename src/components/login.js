import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";

const Login = ({ state, handleChange, handlerSubmit }) => {
  return (
    <Fragment>
      {state.success ? (
        <Redirect to="/profile" />
      ) : (
        // <div>should be redirected to profile page</div>
        <div>
          <form onSubmit={handlerSubmit}>
            <input
              value={state.login.email}
              placeholder="login"
              onChange={e => handleChange("login", "email", e.target.value)}
            />
            <input
              value={state.login.password}
              placeholder="password"
              onChange={e => handleChange("login", "password", e.target.value)}
            />
            <button type="submit">login</button>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
