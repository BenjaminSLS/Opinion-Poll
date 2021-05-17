import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { firestore, auth, increment } from "../lib/firebase";

import { selectVotes } from "../redux/usersSlice";

let _ = require("lodash");

// add reference to owner
export default function Poll({
  caption,
  options: o,
  id,
  creatorId,
  creator,
  tag,
}) {
  const [voted, setVoted] = useState(false);
  const dispatch = useDispatch();
  const votes = useSelector(selectVotes);

  // The reducer
  const reducer = (accumulator, currentValue) => {
    return accumulator + currentValue.votes;
  };

  //Loadash
  let options = _.values(o);

  const sum = options.reduce(reducer, 0);
  options = options.map((option) => {
    return { ...option, precent: option.votes / sum };
  });
  useEffect(() => {
    if (votes.find((vote) => vote.id === id)) {
      setVoted(true);
    } else {
      setVoted(false);
    }
  }, [id, votes]);

  const handleVote = (opid) => {
    if (!voted) {
      console.log("voted");
      console.log(id);
      if (!voted)
        dispatch({ type: "user/addVote", payload: { id, voted: opid } });
      setVoted(true);
      const index = options.findIndex((op) => op.id === opid);
      dispatch({ type: "feed/pollVoted", payload: { index, id } });
      dispatch({ type: "userPolls/pollVoted", payload: { index, id } });

      firestore
        .collection("polls")
        .doc(creatorId)
        .collection("userPolls")
        .doc(id)
        .update({
          [`options.${index}.votes`]: increment(1),
        });
      console.log("feed");
      firestore
        .collection("feed")
        .doc(id)
        .update({
          [`options.${index}.votes`]: increment(1),
        });
      console.log("users");
      firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("votes")
        .doc(id)
        .set({ voted: opid });
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 sm:mx-2 lg:w-1/2 lg:mx-auto mb-2 rounded-md">
      <div className="px-4 py-6">
        <h1 className="dark:text-white font-bold ">{caption}</h1>
        <h1 className="dark:text-white">Created by: {creator}</h1>
        {options ? (
          options.map((option) => {
            return (
              <div
                key={option.id}
                className="w-full dark:bg-gray-700 bg-gray-200 cursor-pointer relative"
                onClick={() => {
                  setVoted(true);
                  handleVote(option.id);
                }}
              >
                <p className="dark:text-white ml-2 absolute z-10">
                  {option.text + " "}
                </p>
                <div
                  className="mt-4 h-6 bg-green-600 flex relative"
                  style={{
                    width: `${voted ? `${option.precent * 100}%` : "0%"}`,
                  }}
                ></div>
                {voted ? (
                  <p className=" dark:text-white absolute top-0 right-2">
                    {Math.round(option.precent * 100)}%
                  </p>
                ) : (
                  <></>
                )}
              </div>
            );
          })
        ) : (
          <></>
        )}
        {voted ? (
          <h1 className="dark:text-white text-sm mt-2">Total votes: {sum}</h1>
        ) : (
          <></>
        )}
        {tag ? (
          <div className="">
            <h1 className="inline-block text-xs dark:text-white">Tag: </h1>
            <h1 className="bg-gray-200 dark:bg-gray-600 dark:text-white text-xs rounded-sm w-min px-2 ml-2 inline-block border border-black dark:border-gray-500">
              {tag}
            </h1>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
