import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StartPage } from "./Pages";
import { RegisterPage } from "./Pages";
import { LoginPage } from "./Pages";
import { MainPage } from "./Pages";
import { NotFoundPage } from "./Pages";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={StartPage} exact />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/main" component={MainPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
