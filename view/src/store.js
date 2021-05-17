import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/rootReducer";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// This genrates the store with the the thunk middelware which allows for async request
export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
