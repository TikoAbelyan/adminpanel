import React, { useState, useEffect } from "react";
import { Container, Form, Popup, Input, Button } from "semantic-ui-react";
import axios from "axios";
const Registration = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("choose image");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const initialstate = {
    user: {
      name: "",
      surname: "",
      email: "",
      password: "",
      phone: "",
      text: null,
      file: ""
    },
    success: null,
    error: null
  };
  const [state, setState] = useState(initialstate);

  console.log("FILENAME", filename);

  const handleChange = (type, target, value) => {
    setState(prevsState => ({
      ...prevsState,
      [type]: { ...prevsState[type], [target]: value }
    }));
    // setFile(target.files[0]);
    // setFilename(target.files[0].name);
  };
  const handleImageChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const onSubmit = async () => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://admin.com:4000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      // console.log(fileName, filePath);
      // console.log("UPLOADED FILE", uploadedFile);
      // console.log("STATE MEJI", state);
      setMessage("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };
  // console.log("DRSIC FILENAME", setFilename);
  const addUser = () => {
    console.log(state);
    const { user } = state;
    fetch(
      `http://admin.com:4000/users/add?name=${user.name}&surname=${user.surname}&email=${user.email}&password=${user.password}&phone=${user.phone}&text=${user.text}&img=${user.file}`
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
        text: "",
        filename: ""
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
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              // label="Հեոախոս"
              // placeholder="+374XXXXXX"
              type="file"
              onChange={e => {
                handleChange("user", "file", e.target.files[0].name);
                handleImageChange(e);
              }}
              // value={state.user.img}
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
            <Form.Field className="d-flex justify-content-center">
              <Button
                className="w-100"
                color="primary"
                onClick={() => {
                  onSubmit();
                  addUser();
                }}
              >
                Գրանցվել
              </Button>
            </Form.Field>
          </Form.Group>
        </Form>
        {/* <Form onSubmit={onSubmit}> */}

        {/* <input
            type="submit"
            value="Upload"
            className="btn btn-primary btn-block mt-4"
          /> */}
        <h3 className="text-center">{uploadedFile.fileName}</h3>
        <img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />
        {/* </Form> */}
        {uploadedFile ? (
          <div className="row mt-5">
            <div className="col-md-6 m-auto">
              <h3 className="text-center">{uploadedFile.fileName}</h3>
              <img
                style={{ width: "100%" }}
                src={uploadedFile.filePath}
                alt=""
              />
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  );
};

export default Registration;
