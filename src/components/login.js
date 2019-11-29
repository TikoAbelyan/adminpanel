import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Container, Form, Popup, Input, Button } from "semantic-ui-react";

const Login = ({ state, handleChange, handlerSubmit }) => {
  return (
    <Fragment>
      {state.success ? (
        <Redirect to="/profile" />
      ) : (
        // <div>should be redirected to profile page</div>

        <Container>
          <Form
            className="row w-100 flex-column justify-content-center align-items-center"
            onSubmit={handlerSubmit}
          >
            <Form.Group widths="equal" className="col-sm-5">
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                placeholder="login"
                onChange={e => handleChange("login", "email", e.target.value)}
                value={state.login.email}
              />
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                placeholder="password"
                onChange={e =>
                  handleChange("login", "password", e.target.value)
                }
                value={state.login.password}
              />
              <Button type="submit" color="facebook">
                login
              </Button>
            </Form.Group>
          </Form>
        </Container>
      )}
    </Fragment>
  );
};

export default Login;
