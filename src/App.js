import React, { Component } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import Console from "./console/console";
import Home from "./home/home";
import Login from "./login/login";
import Score from "./score/score";
import Start from "./start/start";
import Stats from "./stats/stats";
import Toss from "./toss/toss";
import Teams from "./teams/teams";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/score" component={Score} />
          <Route path="/console" component={Console} />
          <Route path="/start" component={Start} />
          <Route path="/stats" component={Stats} />
          <Route path="/toss" component={Toss} />
          <Route path="/teams" component={Teams} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
