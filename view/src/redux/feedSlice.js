import { createSlice } from "@reduxjs/toolkit";

import { firestore, auth } from "../lib/firebase";

const initialState = {
  status: "idle",
  polls: [],
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addPoll(state, action) {
      state.polls.unshift(action.payload);
    },
    pollVoted(state, action) {
      const { id, index } = action.payload;
      const pollIndex = state.polls.findIndex((o) => id === o.id);
      state.polls[pollIndex].options[index].votes++;
      state.status = "state";
    },
    pollsLoading(state, action) {
      state.status = "loading";
    },
    pollsLoaded(state, action) {
      state.status = "idle";
      state.polls = state.polls.concat(action.payload);
    },
    removePolls(state, action) {
      state.polls = [];
    },
  },
});

export default feedSlice.reducer;

export const {
  addPoll,
  removePolls,
  pollsLoading,
  pollsLoaded,
  pollVoted,
} = feedSlice.actions;

export function fetchFeedPolls(dispatch, getState) {
  if (auth.currentUser) {
    dispatch(pollsLoading());

    firestore
      .collection("feed")
      .orderBy("timestamp", "desc")
      .get()
      .then((snapshot) => {
        let docs = [];
        snapshot.forEach((doc) => {
          let data = doc.data();

          data.id = doc.id;
          docs.push(data);
        });

        dispatch(pollsLoaded(docs));
      });
  }
}

// Selectors

export const selectFeedPolls = (state) => state.feed.polls;
export const selectPollWithId = (state, id) =>
  state.polls.polls.find((o) => id === o.id);
export const selectTags = (state, search) => {
  state.polls.polls.filter((o) => o.startsWith(search));
};
