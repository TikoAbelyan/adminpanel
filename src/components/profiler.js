import React, { useEffect, useState } from "react";
import { Dimmer, Loader, Button, Modal } from "semantic-ui-react";
import useData from "./Hooks/useData";

const initialstate = {
  users: [],
  user: {
    name: "",
    surname: "",
    email: "",
    phone: "",
    isAdmin: "",
    aa: "aaa"
  },
  success: false,
  error: ""
};
const Profile = () => {
  const [store, updateStore] = useData(initialstate);
  const [modal, setModal] = useState(false);
  const onToggle = () => {
    setModal(!modal);
  };
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async final => {
    try {
      const res = await fetch("http://admin.com:4000/profile", {
        credentials: "include"
      });
      const response = await res.json();
      updateStore({
        users: response.data.users,
        user: response.data.user,
        success: true,
        error: ""
      });
      if (final) {
        final();
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log("Store", store);
  const handleUserDelete = async index => {
    const { id } = index;
    console.log("index", index);
    await fetch(`http://admin.com:4000/delete/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    getUserData();
    // .then(res => res.json())
    // .then(data => {
    //   const newList = state.users;
    //   newList.filter(i => i.id !== data.id);
    //   setState(getUserData());
    //   console.log("state delete", state);
    // });
  };

  const setCurrentUser = index => {
    setUser(store.users.filter((it, i) => index === i)[0]);
  };
  const handleEdit = ({ type, value }) => {
    setUser(prevState => ({ ...prevState, [type]: value }));
  };

  const handleSubmit = async index => {
    const { id, name, surname, email, phone } = user;

    console.log("index", index);
    await fetch(`http://admin.com:4000/update/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, surname, email, phone })
    });

    getUserData(onToggle);
  };

  return (
    <div>
      {!store.success && !store.logedIn ? (
        <Dimmer active>
          <Loader size="mini">Loading</Loader>
        </Dimmer>
      ) : (
        <div>
          <div>
            <div>{store.user.name}</div>
            <div>{store.user.surname}</div>
            <div>{store.user.phone}</div>
            <div>{store.user.email}</div>
          </div>
          {store.user.isAdmin && (
            <table>
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
              {store.users &&
                store.users.map((it, index) => {
                  return (
                    <tbody key={it.id}>
                      <tr>
                        <td>{it.name}</td>
                        <td>{it.surname}</td>
                        <td>{it.email}</td>
                        <td>{it.password}</td>
                        <td>{it.phone}</td>
                        <td>
                          <Button
                            onClick={() => {
                              onToggle();
                              setCurrentUser(index);
                            }}
                          >
                            edit
                          </Button>
                          {user && (
                            <Modal
                              open={modal}
                              size="tiny"
                              header="Reminder!"
                              className="modal_container"
                              content={
                                <div>
                                  <div>{user.name}</div>
                                  <div>{user.surname}</div>
                                  <div>{user.email}</div>
                                  <div>{user.phone}</div>
                                  <input
                                    onChange={({ target: { value } }) =>
                                      handleEdit({
                                        type: "name",
                                        value
                                      })
                                    }
                                    value={user.name}
                                  />
                                  <input
                                    onChange={({ target: { value } }) =>
                                      handleEdit({
                                        type: "surname",
                                        value
                                      })
                                    }
                                    value={user.surname}
                                  />
                                  <input
                                    onChange={({ target: { value } }) =>
                                      handleEdit({
                                        type: "email",
                                        value
                                      })
                                    }
                                    value={user.email}
                                  />
                                  <input
                                    onChange={({ target: { value } }) =>
                                      handleEdit({
                                        type: "phone",
                                        value
                                      })
                                    }
                                    value={user.phone}
                                  />
                                </div>
                              }
                              actions={[
                                <Button key="a" onClick={() => handleSubmit()}>
                                  done
                                </Button>,
                                <Button key="b" onClick={onToggle}>
                                  close
                                </Button>
                              ]}
                            />
                          )}
                        </td>
                        <td>
                          <Button onClick={() => handleUserDelete(it)}>
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
