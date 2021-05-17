import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addSchema as schema } from "../lib/schemas";

import { firestore, auth, serverTimestamp } from "../lib/firebase";

import Option from "../components/Option";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";

let _ = require("lodash");

export default function Add() {
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");

  // This variable is sets the max amout of options
  const maxOptions = 4;

  const dispatch = useDispatch();

  const handleOptionAdd = () => {
    if (options.length < maxOptions) {
      setOptions([...options, { id: nanoid(), text: "", votes: 0 }]);
    } else {
      // Gives feedback if the users exceeds the max amout of options
      toast.warn(`You cannot have more than ${maxOptions} options`, {
        position: "bottom-right",
        className: "text-black",
      });
    }
  };

  const handleDelete = ({ target: { id } }) => {
    const voteOptions = options.filter((option) => option.id !== id);

    setOptions(voteOptions);
  };

  const handleCaptionChange = ({ target: { value } }) => {
    setCaption(value);
  };

  const handleOptionChange = ({ target: { id, value } }) => {
    let voteOptions = [...options];
    const index = voteOptions.findIndex((option) => option.id === id);
    voteOptions[index].text = value;
    setOptions(voteOptions);
  };

  const handleTagChange = ({ target: { value } }) => {
    setTags(value);
  };
  const handleSubmit = (e) => {
    // This prevents the default behavior of the DOM which is to refresh the page
    e.preventDefault();

    const validation = schema.validate({ caption, tags, options });

    if (typeof validation.error != "undefined") {
      setError(validation.error.details[0].message);
      return;
    }
    // Remaps the options from an array to a map, since it's easier to manipulates maps rather than arrays
    let mapOptions = _.keyBy(options, function (o) {
      return options.findIndex((option) => o.id === option.id);
    });

    // This generates a randomid
    const id = nanoid();

    // Adds the poll to the users profile
    firestore
      .collection("polls")
      .doc(auth.currentUser.uid)
      .collection("userPolls")
      .doc(id)
      .set({
        creator: auth.currentUser.displayName,
        caption,
        tags,
        options: mapOptions,
        creatorId: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      });

    // Adds the poll to the feed
    firestore.collection("feed").doc(id).set({
      caption,
      options: mapOptions,
      creator: auth.currentUser.displayName,
      tags,
      creatorId: auth.currentUser.uid,
      timestamp: serverTimestamp(),
    });

    // Adds the new poll to the uplifted store
    dispatch({
      type: "userPolls/addPoll",
      payload: {
        id,
        caption,
        options,
        creatorId: auth.currentUser.uid,
        creator: auth.currentUser.displayName,
        tags,
      },
    });

    dispatch({
      type: "feed/addPoll",
      payload: {
        id,
        caption,
        options,
        creatorId: auth.currentUser.uid,
        creator: auth.currentUser.displayName,
        tags,
      },
    });
    setTimeout(() => window.location.replace("/"), 1000);
  };

  return (
    <div className="mx-auto flex justify-center h-full bg-gray-200 dark:bg-gray-700">
      <div className="w-1/2 shadow-xl my-10 h-4/5 bg-white  relative rounded-lg">
        <h1 className="text-2xl text-center mt-2">Create a new Poll</h1>
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <label className="block text-xl" htmlFor="caption">
              Question
            </label>
            <input
              className="outline-none focus:ring-indigo-800 focus:ring-2 rounded-sm block"
              name="caption"
              type="text"
              onChange={handleCaptionChange}
              placeholder="Enter caption here"
            />
            <label className="block text-xl" htmlFor="caption">
              Tag
            </label>
            <input
              className="outline-none focus:ring-indigo-800 focus:ring-2 rounded-sm block"
              name="tag"
              type="text"
              onChange={handleTagChange}
              placeholder="Enter a single tag here"
            />
            <div className="flex flex-row">
              <label
                className="inline-block text-xl flex-grow"
                htmlFor="caption"
              >
                Options
              </label>
              <button
                type="button"
                className=" bg-gray-800 h-6 rounded-sm px-2 hover:bg-gray-900 text-white text-center"
                onClick={handleOptionAdd}
              >
                Add new Option
              </button>
            </div>
            <div className="mx-1">
              {options.map((option) => (
                <Option
                  handleDelete={handleDelete}
                  handleOptionChange={handleOptionChange}
                  option={option}
                  key={option.id}
                />
              ))}
            </div>
            <p className="inline-block ">{`${options.length}/${maxOptions}`}</p>
            {error ? <h1 className="text-red-600">{error}</h1> : <></>}
            <button
              type="submit"
              className="absolute bottom-0 right-0 rounded-sm bg-blue-600 text-white px-4 m-2"
            >
              Save
            </button>
          </form>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}
