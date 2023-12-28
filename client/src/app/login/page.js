"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSetRecoilState, useRecoilState } from "recoil";
import userState from "../../atoms/userAtom";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });

  const [loginErrMsg, setLoginErrMsg] = useState("");

  const [user, setUser] = useRecoilState(userState);
  console.log(user);

  const onInputChangeHandler = (e) => {
    setLoginForm((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginForm.username && loginForm.password) {
      try {
        console.log(loginForm);
        const { data } = await axios.post("http://localhost:8000/auth/login", loginForm, {
          withCredentials: true
        });
        setUser(data);
      } catch (err) {
        console.log(err, "during login");
        setLoginErrMsg(err.response.data);
      }
    } else {
      setLoginErrMsg("Заполните все поля");
    }
  };

  const handleLogout = async (e) => {
    const { data } = await axios.get("http://localhost:8000/auth/logout", {
      withCredentials: true
    });
    e.preventDefault();
    setUser(null);
  };
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="container m-auto py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Login Form</h1>
        <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
              username
            </label>
            <input
              onChange={onInputChangeHandler}
              value={loginForm.username}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="username"
              id="username"
              name="username"
              placeholder="john@example.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input
              onChange={onInputChangeHandler}
              value={loginForm.password}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              id="password"
              name="password"
              placeholder="********"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            type="submit">
            Login
          </button>
          <p className="gap-y-10 text-center">or</p>
          <Link href="/registration">
            <div
              className="w-full bg-indigo-500 text-center text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
              type="submit">
              Register
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full bg-indigo-500 text-white text-sm font-bold py-2 my-3 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            type="submit">
            Logout
          </button>
        </form>
        {loginErrMsg && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{loginErrMsg}</AlertDescription>
          </Alert>
        )}
        {user && <div>{user.name}</div>}
      </div>
    </div>
  );
};

export default Login;
