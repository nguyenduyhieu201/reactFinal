import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import REACTJS_ROUTER from "./components/Router/ReactJS_Router";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./components/Login/ReactJS_Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from "react";
import HomePage from "./components/Router/ReactJS_HomePage";
import PostsAPI from "./components/API/ReactHook_PostsAPI";
import REACTJS_Detail from "./components/API/ReactHook_PostsAPIDetails";
import LoginContext from "./components/Context/LoginContext";
import { Link } from 'react-router-dom';


//Functional Component
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("TOKEN") || null);
  const [userId, setUserId] = useState(localStorage.getItem("USERID") || null);


  useEffect(() => {
    if (userId) {
      localStorage.setItem("USERID", userId);
    } else {
      localStorage.removeItem("USERID");
    }
  }, [userId]);

  const sharedAuthenticationTool = {
    token,
    setToken,
    userId,
    setUserId,
  };



  return (
    <div className="app-container">
      
      <LoginContext.Provider value={sharedAuthenticationTool}>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav>
                <Link className="col-md-4 me-auto" to="/home">Home</Link>
                <Link className="col-md-4 me-auto" to="/postsAPI">Post</Link>
                <Link className="col-md-4 me-auto" to="/profile">Profile</Link>
                {token == null && (
                  <Link
                    className="col-md-4 me-auto"
                    to='/login'
                  >
                    Login
                  </Link>
                )}
                {token != null && (
                  <button
                    className="top-nav--link"
                    onClick={() => {
                      setToken(null);
                      setUserId(null);
                    }}
                  >
                    Logout
                  </button>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <REACTJS_ROUTER />
      </LoginContext.Provider>

    </div>
  );
}

export default App;



// import "../Styles/Bar.css";
// import "bootstrap/dist/css/bootstrap.css";
// import REACTJS_ROUTER from "./ReactJS_Router";
// import { Link } from 'react-router-dom';
// import { Container, Nav, Navbar } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { LoginContext } from "../Context/LoginContext";
// // import { Login } from "./components/Router/ReactJS_Login";


// const ReactJS_Bar = () => {
//     const [token, setToken] = useState(null);
//     const [userId, setUserId] = useState(null);

//     useEffect(() => {
//         if (token) {
//             localStorage.setItem("TOKEN", token);
//         } else {
//             localStorage.removeItem("TOKEN");
//         }
//     }, [token]);

//     useEffect(() => {
//         if (userId) {
//             localStorage.setItem("USERID", userId);
//         } else {
//             localStorage.removeItem("USERID");
//         }
//     }, [userId]);

//     const sharedAuthenticationTool = {
//         token,
//         setToken,
//         userId,
//         setUserId,
//     };

//     console.log("bar");

//     return (
//         <div className="container-fluid">
//             <LoginContext.Provider value={sharedAuthenticationTool}>
//                 <Navbar bg="light" expand="lg">
//                     <Container>
//                         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                         <Navbar.Collapse>
//                             <Nav>
//                                 <Link class="col md-4 me-auto" to="/home">Home</Link>
//                                 <Link class="col md-4 me-auto" to="/postsAPI">Post</Link>
//                                 {token == null && (
//                                     <Link
//                                         className="col md-4 me-auto"
//                                         to='/login'
//                                     >
//                                         Login
//                                     </Link>
//                                 )}
//                                 {token != null && (
//                                     <button
//                                         className="top-nav--link"
//                                         onClick={() => {
//                                             setToken(null);
//                                             setUserId(null);
//                                         }}
//                                     >
//                                         Logout
//                                     </button>
//                                 )}
//                             </Nav>
//                         </Navbar.Collapse>
//                     </Container>
//                 </Navbar>
//             </LoginContext.Provider>
//             <REACTJS_ROUTER />
//         </div>
//     );
// }

// export default ReactJS_Bar;
/* <Route
          path="/"
          exact
        >
          <HomePage />
        </Route> */

/* <Route
  path="/posts"
  exact
>
  <PostsAPI />
</Route>
<Route
  path="/posts/:id"
  exact
>
  <REACTJS_Detail />
</Route>
 
<Route
  path="/login"
  exact
>
  <Login
    loginSuccess={loginSuccess}
  />
</Route>

export default App;



// const Logout = () => {
//   setUser({
//     name: "",
//     email: "",
//   });
// }*/