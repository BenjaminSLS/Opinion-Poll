import React from "react";

export default function Option({ handleDelete, handleOptionChange, option }) {
  return (
    <div className="flex flex-row mt-2">
      <input
        key={option.id}
        className=" flex-grow inline-block outline-none focus:ring-indigo-800 focus:ring-2 rounded-sm mr-10"
        name="option"
        type="text"
        id={option.id}
        onChange={handleOptionChange}
        placeholder="Enter option here"
      />
      <button
        type="button"
        id={option.id}
        className="bg-red-500 text-white px-2 rounded-sm"
        onClick={handleDelete}
      >
        X
      </button>
    </div>
  );
}
