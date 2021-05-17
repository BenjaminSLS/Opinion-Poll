import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import React from "react";

import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

import { Provider } from "react-redux";

import store from "./store";
import Add from "./pages/Add";

import { auth } from "./lib/firebase";

import ThemeDiv from "./components/ThemeDiv";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Search from "./pages/Search";

const redirectLogin = (component) => {
  if (!auth.currentUser) {
    return <Redirect to="/login" />;
  } else {
    return component;
  }
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Navbar />
          <ThemeDiv>
            <div className="pt-16 h-screen">
              <Switch>
                <Route path="/add" render={() => redirectLogin(<Add />)} />
                <Route
                  path="/search"
                  render={() => redirectLogin(<Search />)}
                />
                <Route
                  path="/profile/:id"
                  render={() => redirectLogin(<Profile />)}
                />
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/">
                  <Feed />
                </Route>
              </Switch>
            </div>
          </ThemeDiv>
        </React.Fragment>
      </Router>
    </Provider>
  );
}
export default App;
