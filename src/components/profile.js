import React, { useEffect, useState } from "react";
import {
  Dimmer,
  Loader,
  Button,
  Modal,
  Form,
  Input,
  Rating,
  Icon
} from "semantic-ui-react";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
// import { Container, Form, Popup, Input, Button } from "semantic-ui-react";

const Profile = () => {
  const initialstate = {
    users: [],
    user: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      isAdmin: "",
      text: "",
      file: "",
      rayting: 0
    },
    success: false,
    error: ""
  };
  const [state, setState] = useState(initialstate);
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      const res = await fetch("http://admin.com:4000/profile/admin", {
        credentials: "include"
      });
      const response = await res.json();
      setState(prevsState => ({
        ...prevsState,
        users: response.data.users,
        user: response.data.user,
        success: true,
        error: ""
      }));
    } catch (err) {
      console.log(err);
    }
    // .then(response => response.json())
    // .then(response => this.setState({ users: response.data }))
    // .catch(err => console.log(err));

    // setState({
    //   users: [],
    //   user: {
    //     name: "user Name",
    //     surname: "Some surname",
    //     email: "test@test.com",
    //     phone: "1231231"
    //   },
    //   success: true,
    //   error: "",
    //   userGroupName: "user"
    // });
  };

  const handleUserDelete = index => {
    const { id } = index;
    return fetch(`http://admin.com:4000/delete/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        const newList = state.users;
        newList.filter(i => i.id !== data.id);
        setState(getUserData());
      });
  };
  const handleUpdateUser = it => {
    console.log(it);
  };
  const handleEdit = ({ type, value, index }) => {
    setState(prevsState => ({
      ...prevsState,
      users: prevsState.users.map((it, i) =>
        i === index ? { ...it, [type]: value } : { ...it }
      )
    }));

    // setState(prevsState => ({
    //   ...prevsState,
    //   [type]: { ...prevsState[type], [target]: value }
    // }));
    // setState(prevState => prevState.users.map((it, i) => console.log(...it)));
    // console.log("index", index);
    // console.log("state", state.users);
    // state.users.map((it, i) => {
    //   index === i ? console.log(it) : console.log("chka");
    // });
  };
  const getUpdated = index =>
    state.users.filter((it, ind) => index === ind && it)[0];

  const editAble = async index => {
    const { id, name, surname, email, phone, text } = getUpdated(index);

    console.log("index", index);
    await fetch(`http://admin.com:4000/update/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ name, surname, email, phone, text })
    });
  };

  // fetch(`http://admin.com:4000/delete/${index.id}`)
  //   .then(response => response.json())
  //   .then(response => this.setState({ users: response.data }))
  //   .catch(err => console.log(err));
  // fetch(`http://admin.com:4000/delete/${index.id}`)
  //   .then(response => response.json())
  //   .then(result => console.log(result))
  //   .catch(e => console.log(e));

  // console.log("PRIFILE users", state.users);
  // console.log("PRIFILE user", state.user);
  return (
    <div>
      {!state.success && !state.logedIn ? (
        <Dimmer active>
          <Loader size="mini">Loading</Loader>
        </Dimmer>
      ) : (
        <div className="profile_check">
          <div className="allinfo">
            {state.user.groupId === 2 ? (
              <div>
                <p className="position_adm">
                  <span className="adm">Hello Admin </span>
                  {state.user.name}
                </p>
                <div className="d-flex pb-2">
                  <Icon name="user" size="large" />
                  {state.user.surname}
                </div>

                <div className="d-flex pb-2">
                  <Icon name="phone" size="large" />
                  {state.user.phone}
                </div>
                <div className="d-flex pb-2">
                  <Icon name="mail" size="large" />
                  {state.user.email}
                </div>
              </div>
            ) : (
              <div>
                <p className="position_adm">
                  <span className="adm">Hello user </span> {state.user.name}
                </p>
                <div>
                  <span className="us_info">user surname</span>{" "}
                  {state.user.surname}
                </div>
                <div>
                  <span className="us_info">user phone</span> {state.user.phone}
                </div>
                <div>
                  <span className="us_info">user email</span> {state.user.email}
                </div>
              </div>
            )}
            <div>
              <img
                src={require(`../../public/upload/${state.user.img}`)}
                width="100"
                height="100"
              />
            </div>
            <div>
              <Rater
                total={5}
                rating={state.user.rayting}
                // onRate={({ rating }) => console.log({ rating })}
              />
              <h3 style={{ textAlign: "center", color: "red" }}>
                {state.user.rayting}
              </h3>
            </div>
          </div>

          {state.user.text && state.user.groupId === 1 && (
            <div className="btn_auth">
              <span className="adm">Admin send message </span>
              <p>{state.user.text}</p>
            </div>
          )}
          {state.user.groupId === 2 && (
            <table className="table_secction">
              <thead className="first_compon">
                <tr>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>phone</th>
                  <th>edit</th>
                  <th>delete</th>
                </tr>
              </thead>
              {state.users &&
                state.users.map((it, index) => {
                  return (
                    <tbody key={it.id}>
                      <tr className="tr_section">
                        <td>{it.name}</td>
                        <td>{it.surname}</td>
                        <td>{it.email}</td>
                        <td title={it.password}>/HASH/</td>
                        <td>{it.phone}</td>
                        <td>
                          <Modal
                            trigger={
                              <Button
                                color="green"
                                onClick={() => handleUpdateUser(it)}
                              >
                                <Icon name="edit" size="large" />
                                edit
                              </Button>
                            }
                            size="tiny"
                            header="Reminder!"
                            className="modal_container"
                            content={
                              <div>
                                <div className="fl_container">
                                  <div>{it.name}</div>
                                  <div>{it.surname}</div>
                                  <div>{it.email}</div>
                                  <div>{it.phone}</div>
                                  {/* <div>{it.text}</div> */}
                                </div>

                                <Form className="row w-100 flex-column justify-content-center align-items-center">
                                  <Form.Group
                                    widths="equal"
                                    className="col-sm-9"
                                  >
                                    <Form.Field
                                      id="form-input-control-last-name"
                                      control={Input}
                                      label="Ազգանուն"
                                      placeholder="surname"
                                      onChange={({ target: { value } }) =>
                                        handleEdit({
                                          type: "name",
                                          value,
                                          index
                                        })
                                      }
                                      value={it.name}
                                    />
                                    <Form.Field
                                      id="form-input-control-first-name"
                                      control={Input}
                                      label="Անուն"
                                      placeholder="First name"
                                      onChange={({ target: { value } }) =>
                                        handleEdit({
                                          type: "surname",
                                          value,
                                          index
                                        })
                                      }
                                      value={it.surname}
                                    />
                                  </Form.Group>

                                  <Form.Group
                                    widths="equal"
                                    className="col-sm-9"
                                  >
                                    <Form.Field
                                      id="form-input-control-first-name"
                                      control={Input}
                                      label="Էլ․ Հասցե"
                                      placeholder="email"
                                      type="email"
                                      onChange={({ target: { value } }) =>
                                        handleEdit({
                                          type: "email",
                                          value,
                                          index
                                        })
                                      }
                                      value={it.email}
                                    />
                                    <Form.Field
                                      id="form-input-control-last-name"
                                      control={Input}
                                      label="Հեոախոս"
                                      placeholder="+374XXXXXX"
                                      type="number"
                                      onChange={({ target: { value } }) =>
                                        handleEdit({
                                          type: "phone",
                                          value,
                                          index
                                        })
                                      }
                                      value={it.phone}
                                    />
                                  </Form.Group>
                                  <Form.Group
                                    widths="equal"
                                    className="col-sm-9"
                                  >
                                    <Form.Field
                                      id="form-input-control-first-name"
                                      control={Input}
                                      label="text user"
                                      placeholder="text user"
                                      onChange={({ target: { value } }) =>
                                        handleEdit({
                                          type: "text",
                                          value,
                                          index
                                        })
                                      }
                                      value={it.text}
                                    />
                                  </Form.Group>
                                </Form>
                                <div className="d-flex justify-content-center">
                                  <Rater
                                    total={5}
                                    rating={state.user.rayting}
                                  />
                                </div>
                              </div>
                            }
                            actions={[
                              <Button key="b">close</Button>,
                              <Button key="a" onClick={() => editAble(index)}>
                                Done
                              </Button>
                            ]}
                          />
                        </td>
                        <td>
                          <Button
                            color="red"
                            onClick={() => handleUserDelete(it)}
                          >
                            <Icon name="remove" size="large" />
                            delete
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
