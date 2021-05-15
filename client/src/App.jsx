//npm install --save react-background-slideshow
//npm install node-sass --save

import React from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import About from "./Components/About";
import Team from "./Components/Team";
import Footer from "./Components/Footer";
//npm install react-router-dom
import Login from "./Components/userAccount/Login";
import Register from "./Components/userAccount/Register";
import ForgetPW from "./Components/userAccount/ForgetPW";
import ResetPW from "./Components/userAccount/PwReset";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Test from "./Components/Test";

 const App = () => {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <Main />  
        <Test />      
        <About />
        <Team />
        <Footer />
       
      </div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forget_password" component={ForgetPW} />
        <Route exact path="/reset_password" component={ResetPW} />
      </Switch>
    </Router>
  );
};

export default App;
