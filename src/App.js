import React from "react";
import "./App.css";
import Header from "./Header";
import NameCards from "./NameCards";
import Chats from "./Chats";
import FooterButtons from "./FooterButtons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/chat">
            <Header />
            <Chats />
          </Route>
          <Route path="/">
            <Header />
            <NameCards />
          </Route>
        </Switch>
        <FooterButtons />
      </Router>
    </div>
  );
}

export default App;
