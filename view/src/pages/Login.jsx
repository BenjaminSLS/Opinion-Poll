import React, { useState } from "react";
import { auth, persistence } from "../lib/firebase";
import { Link, Redirect } from "react-router-dom";
import { loginSchema as schema } from "../lib/schemas";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Login with form data
  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = schema.validate(form);
    console.log();
    if (typeof validation.error === "undefined") {
      auth
        .signInWithEmailAndPassword(form.email, form.password)
        .then((userCredential) => {
          console.log(userCredential.user.uid);
          auth
            .setPersistence(persistence)
            .then(() => window.location.replace("/"));
        })
        .catch((error) => {
          setError(error.message);
          console.log("Something went wrong");
          console.warn(error);
        });
    } else {
      console.log("Invalid");
    }
  };

  const handleChange = ({ target: { id, value } }) => {
    let state = form;
    state[id] = value;
    setForm(state);
    const validation = schema.validate(form);
    setError(
      typeof validation.error !== "undefined"
        ? validation.error.details[0].message
        : ""
    );
  };
  return (
    <div className="dark:bg-gray-700 h-full">
      <div className="flex w-3/4 mx-auto justify-center">
        <div className="">
          <form className="" onSubmit={handleSubmit}>
            <label className="dark:text-white">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              className="mt-t focus:border-blue-600 outline-none border-2 block w-96 shadow-sm sm:text-sm rounded-md"
              onChange={handleChange}
            />
            <label className="dark:text-white">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className=" focus:border-blue-600 outline-none border-2 block w-96 shadow-sm sm:text-sm rounded-md"
              onChange={handleChange}
            />
            <h1 className="text-red-600">{error}</h1>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border-none rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
          focus:outline-none"
            >
              Login
            </button>
            <Link
              to="/register"
              className="ml-2 inline-flex items-center px-4 py-2 border-none rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
          focus:outline-none "
            >
              Register
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
