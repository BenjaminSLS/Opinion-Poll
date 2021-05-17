import React, { useState } from "react";
import { auth } from "../lib/firebase";
import { registerSchema as schema } from "../lib/schemas";
export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState("  ");

  const handleSubmit = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(({ user }) => {
        user.updateProfile({ displayName: form.username });
      });
  };

  const handleChange = ({ target: { id, value } }) => {
    let state = form;
    state[id] = value;
    setForm(state);
    const validation = schema.validate(form);
    setError(
      typeof validation.error !== "undefined"
        ? validation.error.details[0].message
        : " "
    );
  };
  return (
    <div className="dark:bg-gray-700 h-full">
      <div className="flex w-3/4 mx-auto justify-center">
        <form className="" onSubmit={handleSubmit}>
          <label className="dark:text-white">Username</label>
          <input
            type="text"
            id="username"
            placeholder=""
            className="mt-t focus:border-blue-600 outline-none border-2 block w-96 shadow-sm sm:text-sm rounded-md"
            onChange={handleChange}
          />
          <label className="dark:text-white">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            className="mt-t focus:border-blue-600outline-none border-2 block w-96 shadow-sm sm:text-sm rounded-md"
            onChange={handleChange}
          />
          <label className="dark:text-white">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="mt-t focus:border-blue-600 outline-none border-2 block w-96 shadow-sm sm:text-sm rounded-md"
            onChange={handleChange}
          />
          <h1 className="text-red-600">{error}</h1>

          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border-none rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
          focus:outline-none"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
