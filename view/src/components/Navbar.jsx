import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../lib/firebase";
import { useDispatch } from "react-redux";
import SwitchSlider from "../components/common/Switch";
export default function Navbar() {
  const dispatch = useDispatch();
  const [loggedin, setLoggedin] = useState(false);
  const [lightMode, setTheme] = useState(false);
  auth.onAuthStateChanged(() => setLoggedin(true));
  const buttonClass =
    "p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md px-3 py-2 ";
  return (
    <div className="w-full bg-blue-600 h-16 fixed z-50">
      <div className="flex space-x-2 p-3">
        <Link to="/">
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-1 justify-center">
              <h1 className=" my-auto text-white font-bold text-2xl cursor-pointer">
                Opinion poll
              </h1>
            </div>
          </div>
        </Link>
        <Link to="/" className={buttonClass}>
          Feed
        </Link>
        <Link to="/add" className={buttonClass}>
          Create
        </Link>
        <Link to="/search" className={buttonClass}>
          Search
        </Link>

        <div className="absolute right-0">
          <div className="flex justify-between items-center">
            <SwitchSlider
              className="mr-2"
              isToggled={lightMode}
              onToggle={() => {
                setTheme(!lightMode);
                console.log(lightMode);
                lightMode
                  ? dispatch({ type: "theme/light" })
                  : dispatch({ type: "theme/dark" });
              }}
            />
            <h1> </h1>
            <div className="mr-2  inline-block">
              {auth.currentUser ? (
                <div className="flex flex-row">
                  <Link
                    className="bg-green-600 text-center  rounded-md pt-2 px-2 mr-2"
                    to={`/profile/${auth.currentUser.uid}`}
                  >
                    <h1 className="text-white">
                      {auth.currentUser.displayName}
                    </h1>
                  </Link>
                  <button
                    onClick={() =>
                      auth.signOut().then(() => {
                        dispatch({ type: "polls/removePolls", payload: {} });
                        window.location.reload();
                      })
                    }
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md px-3 py-2 float-right "
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <Link to="/login" className={buttonClass}>
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
