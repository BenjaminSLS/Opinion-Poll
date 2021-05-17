import { combineReducers } from "redux";

import pollReducer from "./pollSlice";
import userReducer from "./usersSlice";
import themeReducer from "./themeSlice";
import feedReduder from "./feedSlice";

// This combines all the reducers into a single reducer
export default combineReducers({
  polls: pollReducer,
  user: userReducer,
  theme: themeReducer,
  feed: feedReduder,
});
