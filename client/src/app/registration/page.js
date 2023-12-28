"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
const Registration = () => {
  const [registrationForm, setRegistrationForm] = useState({
    username: "",
    name: "",
    email: "",
    password: ""
  });

  const [registrationErrMsg, setRegistrationErrMsg] = useState("");

  const onInputChangeHandler = (e) => {
    setRegistrationForm((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
    console.log(registrationForm);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (
      registrationForm.name &&
      registrationForm.username &&
      registrationForm.email &&
      registrationForm.password
    ) {
      try {
        console.log(registrationForm);
        await axios.post("http://localhost:8000/auth/register", registrationForm);
      } catch (err) {
        console.log(err, "during registration");
        setRegistrationErrMsg(err.response.data);
      }
    } else {
      setRegistrationErrMsg("Заполните все поля");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col py-20 items-center justify-center">
      <div className="container m-auto py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Registration Form</h1>
        <div className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="name">
              Username
            </label>
            <input
              onChange={onInputChangeHandler}
              value={registrationForm.username}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="name"
              name="username"
              placeholder="John Doe"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="name">
              Name
            </label>
            <input
              onChange={onInputChangeHandler}
              value={registrationForm.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input
              onChange={onInputChangeHandler}
              value={registrationForm.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input
              onChange={onInputChangeHandler}
              value={registrationForm.password}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              id="password"
              name="password"
              placeholder="********"
            />
          </div>

          <button
            onClick={handleRegistration}
            className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            type="submit">
            Register
          </button>
          <p className="gap-y-10 text-center">or</p>
          <Link href="/login">
            <div
              className="w-full bg-indigo-500 text-center text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
              type="submit">
              Login
            </div>
          </Link>
        </div>
        {registrationErrMsg && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{registrationErrMsg}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Registration;
