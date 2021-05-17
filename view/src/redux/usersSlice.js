import { createSlice } from "@reduxjs/toolkit";

import { firestore, auth } from "../lib/firebase";
const userSlice = createSlice({
  name: "user",
  initialState: { votes: [] },
  reducers: {
    votesLoaded(state, action) {
      state.votes = state.votes.concat(action.payload);
    },
    addVote(state, action) {
      state.votes.unshift(action.payload);
    },
  },
});

export function fetchUserVotes(dispatch, getState) {
  firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("votes")
    .get()
    .then((snapshot) => {
      let docs = [];
      snapshot.forEach((doc) => {
        let data = doc.data();

        data.id = doc.id;
        docs.push(data);
      });
      dispatch(votesLoaded(docs));
    });
}

export default userSlice.reducer;

export const { votesLoaded } = userSlice.actions;

export const selectVotes = (state) => state.user.votes;
