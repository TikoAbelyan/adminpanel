import React, { useState } from "react";
import { Container, Form, Popup, Input, Button } from "semantic-ui-react";

const Registration = () => {
  const initialstate = {
    user: {
      name: "",
      surname: "",
      email: "",
      password: "",
      phone: "",
      text: null
    },
    success: null,
    error: null
  };

  const [state, setState] = useState(initialstate);

  const handleChange = (type, target, value) => {
    setState(prevsState => ({
      ...prevsState,
      [type]: { ...prevsState[type], [target]: value }
    }));
  };

  const addUser = () => {
    const { user } = state;
    fetch(
      `http://admin.com:4000/users/add?name=${user.name}&surname=${user.surname}&email=${user.email}&password=${user.password}&phone=${user.phone}&text=${user.text}`
    )
      // .then(response=>response.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));
    setState(prevsState => ({
      ...prevsState,
      user: {
        name: "",
        surname: "",
        email: "",
        password: "",
        phone: "",
        text: ""
      }
    }));
  };

  return (
    <div>
      {/* <input
        value={state.user.name}
        placeholder="name"
        onChange={e => handleChange("user", "name", e.target.value)}
      /> */}
      {/* <input
        value={state.user.surname}
        placeholder="surname"
        onChange={e => handleChange("user", "surname", e.target.value)}
      /> */}
      {/* <input
        value={state.user.email}
        type="email"
        placeholder="email"
        onChange={e => handleChange("user", "email", e.target.value)}
      /> */}
      {/* <input
        value={state.user.password}
        type="password"
        placeholder="password"
        onChange={e => handleChange("user", "password", e.target.value)}
      /> */}
      {/* <input
        value={state.user.phone}
        placeholder="phone"
        onChange={e => handleChange("user", "phone", e.target.value)}
      />
      <button onClick={addUser}>Add</button> */}

      <Container>
        <Form className="row w-100 flex-column justify-content-center align-items-center">
          <Form.Group widths="equal" className="col-sm-5">
            <Form.Field
              id="form-input-control-first-name"
              control={Input}
              label="Անուն"
              placeholder="First name"
              onChange={e => handleChange("user", "name", e.target.value)}
              value={state.user.name}
            />
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              label="Ազգանուն"
              placeholder="surname"
              onChange={e => handleChange("user", "surname", e.target.value)}
              value={state.user.surname}
            />
          </Form.Group>
          <Form.Group widths="equal" className="col-sm-5">
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              label="Էլ․ Հասցե"
              placeholder="email"
              type="email"
              onChange={e => handleChange("user", "email", e.target.value)}
              value={state.user.email}
            />
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              label="password"
              placeholder="password"
              type="password"
              onChange={e => handleChange("user", "password", e.target.value)}
              value={state.user.password}
            />
          </Form.Group>

          <Form.Group widths="equal" className="col-sm-5">
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              label="Հեոախոս"
              placeholder="+374XXXXXX"
              type="number"
              onChange={e => handleChange("user", "phone", e.target.value)}
              value={state.user.phone}
            />
          </Form.Group>
          <Form.Group widths="equal" className="col-sm-5">
            <Popup
              trigger={
                <Form.Field
                  // id="form-input-control-last-name"
                  control={Input}
                  label="Ծանոթացել եմ պայմաններին"
                  placeholder="Ծանոթացել եմ պայմաններին"
                  type="checkbox"
                />
              }
              content={<p>canotacel em paymannerin</p>}
              on="click"
              hideOnScroll
            />
            {/* <p></p>
        <input type="" /> */}
            <Form.Field className="d-flex justify-content-center">
              <Button
                className="w-100"
                color="primary"
                // control={Button}
                // // placeholder="Ծանոթացել եմ պայմաններին"
                // options=""
                // type="button"
                onClick={addUser}
              >
                Գրանցվել
              </Button>
            </Form.Field>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default Registration;
