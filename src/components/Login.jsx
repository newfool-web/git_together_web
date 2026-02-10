'use client';

import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      setEmailId("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        
        
        <figure className="relative h-48 overflow-hidden">
          <img
            src="https://thumbs.dreamstime.com/b/handshake-emoji-featuring-diverse-skin-tones-white-background-image-handshake-emoji-featuring-diverse-skin-tones-symbolizing-376082597.jpg"
            className="h-full w-full object-cover"
            alt="Handshake"
          />
          <div className="absolute inset-0 bg-linear-to-t from-base-100 to-transparent" />
        </figure>

        <div className="card-body gap-5 -mt-8 relative z-10">
         
         
          <h2 className="card-title text-3xl font-bold justify-center">
            Welcome Back
          </h2>
          <p className="text-center text-base-content/60 -mt-3 text-sm">
            Sign in to continue
          </p>

          
          
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium mx-10 py-2">Email Address:</span>
            </label>
            <label className="input input-bordered flex items-center gap-3 mx-auto">
              <svg
                className="h-4 w-4 opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </g>
              </svg>
              <input
                type="email"
                className="grow"
                placeholder="mail@site.com"
                required
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
          </div>

          
          
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium mx-10 py-2">Password:</span>
            </label>
            <label className="input input-bordered flex items-center gap-3 mx-auto">
              <svg
                className="h-4 w-4 opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                </g>
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          
          
          {error && (
            <div className="alert alert-error shadow-sm py-2 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          
          

          <div className="card-actions mt-2 justify-end">
            <button
              className="btn btn-primary  text-base"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <p className="text-center text-sm text-base-content/60">
              New User?{" "}
              <a className="link link-primary font-medium" href="/register">
                Register Here!
              </a>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
