import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Nav from "./components/nav";
import Login from "./components/login";
import Home from "./components/home";
import Profile from "./components/profile";
import Registration from "./components/registration";

const App = () => {
  const initialState = {
    login: {
      email: "",
      password: ""
    },
    success: null,
    error: null,
    logedIn: false
  };

  const [state, setState] = useState(initialState);
  localStorage.setItem("propagation", state.success);
  // localStorage.getItem(state.logedIn);
  const handleLogout = () => {
    // localStorage.removeItem("propagation");
    // localStorage.clear();
    setState(prevsState => ({
      ...prevsState,
      success: null,
      logedIn: false
    }));
  };
  // console.log("cookie", document.cookie);
  const handleChange = (type, target, value) => {
    setState(prevsState => ({
      ...prevsState,
      [type]: { ...prevsState[type], [target]: value }
    }));
  };

  // console.log("LOcal", localStorage);

  // console.log("Storage", papar);
  const handlerSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch("http://admin.com:4000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: state.login.email,
          password: state.login.password
        })
      });
      const data = await res.json();
      console.log("data", data);
      if (data && data.success) {
        // localStorage.getItem("bzez");
        setState(prevsState => ({
          ...prevsState,
          success: true,
          error: null,
          logedIn: true
        }));
      } else {
        setState(prevsState => ({
          ...prevsState,
          success: false,
          error: "Could not login, please check email and password are correct",
          logedIn: false
        }));
      }
    } catch (err) {
      console.log(err);
      setState(prevsState => ({
        ...prevsState,
        success: false,
        error: err,
        logedIn: false
      }));
    }
  };

  return (
    <Router>
      <div className="App">
        <Nav state={state} handleLogout={handleLogout} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/login"
            render={props => (
              <Login
                {...props}
                state={state}
                handleChange={handleChange}
                handlerSubmit={handlerSubmit}
                isAuthed={true}
              />
            )}
          />

          <Route path="/profile" component={Profile} />

          <Route path="/registration" component={Registration} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

// const SignUp = () => {
//   const [initialField,setInitialField] = useState({
//     users:[],
//     user:{
//       firstname:"",
//       lastname:"",
//       email:"",
//       password:"",
//       phone:"",
//     }

//   });
//   useEffect(() => {
//   getUser()
//   }, [])
//  const getUser = ()=>{
//     fetch('http://localhost:4000/users')
//     .then(response=>response.json())
//     .then(response=>setInitialField({users:response.data}))
//     .catch(err=>console.log(err))
// }
// addProduct = ()=>{
//   const {product} = this.state
//   fetch(`http://localhost:4000/users/add?name=${product.name}&price=${product.price}`)
//   // .then(response=>response.json())
//   .then(this.getProduct)
//   .catch(err=>console.log(err))
// }
//   const [field,setField] = useState([])
//     const handleAddField = ({ type, value }) => {
//       setInitialField(prevState => ({ ...prevState, [type]: value }));
//     };
//   const handleSubmit = ({ firstname, lastname ,email, password,phone})=>{
//     setField(prevState => [
//         ...prevState,
//         { firstname, lastname, email, password,phone }
//       ]);
//       fetch(`http://localhost:4000/users/add?name=${user.firstname}&price=${user.lastname}&email=${user.email}&password=${user.password}&phone=${user.phone}`)
//       // .then(response=>response.json())
//       .then(getUser())
//       .catch(err=>console.log(err))
//     }
//     console.log(field)
//   return(

//   <Container>

//     <Form className="row w-100 flex-column justify-content-center align-items-center">
//       <Form.Group widths="equal" className="col-sm-5">
//         <Form.Field
//           id="form-input-control-first-name"
//           control={Input}
//           label="Անուն"
//           placeholder="First name"
//           onChange={({ target: { value } }) =>
//           handleAddField({ type: "firstname", value })
//         }
//         value={initialField.firstname}
//         />
//         <Form.Field
//           id="form-input-control-last-name"
//           control={Input}
//           label="Ազգանուն"
//           placeholder="Last name"
//           onChange={({ target: { value } }) =>
//           handleAddField({ type: "lastname", value })
//         }
//         value={initialField.lastname}
//         />
//       </Form.Group>
//       <Form.Group widths="equal" className="col-sm-5">
//         <Form.Field
//           id="form-input-control-last-name"
//           control={Input}
//           label="Էլ․ Հասցե"
//           placeholder="email"
//           type="email"
//           onChange={({ target: { value } }) =>
//           handleAddField({ type: "email", value })
//         }
//         value={initialField.email}
//         />
//         <Form.Field
//           id="form-input-control-last-name"
//           control={Input}
//           label="password"
//           placeholder="password"
//           type="password"
//           onChange={({ target: { value } }) =>
//           handleAddField({ type: "password", value })
//         }
//         value={initialField.password}
//         />

//       </Form.Group>

//       <Form.Group widths="equal" className="col-sm-5">
//         <Form.Field
//           id="form-input-control-last-name"
//           control={Input}
//           label="Հեոախոս"
//           placeholder="+374XXXXXX"
//           type="number"
//           onChange={({ target: { value } }) =>
//           handleAddField({ type: "phone", value })
//         }
//         value={initialField.phone}
//         />
//       </Form.Group>
//       <Form.Group widths="equal" className="col-sm-5">
//         <Popup
//           trigger={
//             <Form.Field
//               // id="form-input-control-last-name"
//               control={Input}
//               label="Ծանոթացել եմ պայմաններին"
//               placeholder="Ծանոթացել եմ պայմաններին"
//               type="checkbox"
//             />
//           }
//           content={
//             <p>
//              canotacel em paymannerin
//             </p>
//           }
//           on="click"
//           hideOnScroll
//         />
//         {/* <p></p>
//         <input type="" /> */}
//         <Form.Field className="d-flex justify-content-center">
//           <Button
//             className="w-100"
//             color="primary"
//             // control={Button}
//             // // placeholder="Ծանոթացել եմ պայմաններին"
//             // options=""
//             // type="button"
//             onClick={()=>{handleSubmit({
//               firstname:initialField.firstname,
//               lastname:initialField.lastname,
//               email:initialField.email,
//               password:initialField.password,
//               phone:initialField.phone,
//             })}}
//           >
//             Գրանցվել
//           </Button>
//         </Form.Field>
//       </Form.Group>
//     </Form>
//   </Container>
//   )
// }
// export default SignUp;

// ///////////////////class

// class App extends Component {
//   state = {
//     users: [],
//     user: {
//       name: "",
//       surname: "",
//       email: "",
//       password: "",
//       phone: ""
//     },
//     login: {
//       email: "",
//       password: ""
//     },
//     success: null,
//     error: null
//   };
//   componentDidMount() {
//     this.getUsers();
//   }
//   getUsers = () => {
//     fetch("http://localhost:4000/users")
//       .then(response => response.json())
//       .then(response => this.setState({ users: response.data }))
//       .catch(err => console.log(err));
//   };
//   addUser = () => {
//     const { user } = this.state;
//     fetch(
//       `http://localhost:4000/users/add?name=${user.name}&surname=${user.lastname}&email=${user.email}&password=${user.password}&phone=${user.phone}`
//     )
//       // .then(response=>response.json())
//       .then(this.getUsers)
//       .catch(err => console.log(err));
//     this.setState({
//       user: {
//         name: "",
//         surname: "",
//         email: "",
//         password: "",
//         phone: ""
//       }
//     });
//   };
//   handlerSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:4000/login", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           email: this.state.login.email,
//           password: this.state.login.password
//         })
//       });
//       const { user } = await res.json();
//       console.log(user);
//       this.setState({
//         success: true,
//         user
//       });
//     } catch (err) {
//       console.log(err);
//       this.setState({
//         success: false,
//         error: err
//       });
//     }
//   };
//   renderProduct = ({ id, name, surname, email, password, phone }) => (
//     <div key={id}>
//       {name} {surname} {email} {password} {phone}
//     </div>
//   );
//   render() {
//     const { users, user, login, success } = this.state;

//     return (
//       <div className="App">
//         {users.map(this.renderProduct)}
//         <div>
//           {/* <Container></Container> */}
//           <inputadmin
//             value={user.name}
//             placeholder="name"
//             onChange={e =>
//               this.setState({ user: { ...user, name: e.target.value } })
//             }
//           />
//           <input
//             value={user.surname}
//             placeholder="surname"
//             onChange={e =>
//               this.setState({ user: { ...user, surname: e.target.value } })
//             }
//           />
//           <input
//             value={user.email}
//             type="email"
//             placeholder="email"
//             onChange={e =>
//               this.setState({ user: { ...user, email: e.target.value } })
//             }
//           />
//           <input
//             value={user.password}
//             type="password"
//             placeholder="password"
//             onChange={e =>
//               this.setState({ user: { ...user, password: e.target.value } })
//             }
//           />
//           <input
//             value={user.phone}
//             placeholder="phone"
//             onChange={e =>
//               this.setState({ user: { ...user, phone: e.target.value } })
//             }
//           />
//           <button onClick={this.addUser}>Add</button>
//         </div>
//         <div>
//           {user && success ? console.log(user) : console.log("chka")}
//           <form onSubmit={this.handlerSubmit}>
//             <input
//               value={login.email}
//               placeholder="login"
//               onChange={e =>
//                 this.setState({ login: { ...login, email: e.target.value } })
//               }
//             />
//             <input
//               value={login.password}
//               placeholder="password"
//               onChange={e =>
//                 this.setState({ login: { ...login, password: e.target.value } })
//               }
//             />
//             <button type="submit">login</button>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
