import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { auth } from "./lib/firebase";

import store from "./store";
import { fetchUserPolls } from "./redux/pollSlice";
import { fetchUserVotes } from "./redux/usersSlice";
import { fetchFeedPolls } from "./redux/feedSlice";

auth.onAuthStateChanged(() => {
  store.dispatch(fetchUserPolls);
  store.dispatch(fetchUserVotes);
  store.dispatch(fetchFeedPolls);
});
store.dispatch({ type: "theme/getLocal" });

// This is the entry point for the app
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
