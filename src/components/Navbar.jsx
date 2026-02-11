import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err)
    }
  };

  const isLandingPage = location.pathname === "/";

  return (
    <div
      className={`navbar sticky top-0 z-50 px-4 md:px-8 transition-all duration-300 ${
        isLandingPage
          ? "bg-base-100/10 backdrop-blur-xl border-b border-white/10"
          : "bg-base-100/95 backdrop-blur-md shadow-lg border-b border-base-300/50"
      }`}
    >
      
      <div className="flex-1 flex items-center gap-3">
        <div className="avatar">
          <div className="w-10 rounded-full ring-2 ring-primary/50 ring-offset-2 ring-offset-base-100 transition-all hover:ring-primary hover:scale-105">
            <img
              src="https://thumbs.dreamstime.com/b/handshake-emoji-featuring-diverse-skin-tones-white-background-image-handshake-emoji-featuring-diverse-skin-tones-symbolizing-376082597.jpg"
              alt="GitTogether logo"
              className="object-cover"
            />
          </div>
        </div>
        <Link
          to="/"
          className={`btn btn-ghost text-xl font-bold tracking-tight normal-case transition-all hover:scale-105 ${
            isLandingPage
              ? "text-white hover:bg-white/10"
              : "hover:bg-base-200"
          }`}
        >
          GitTogether
        </Link>
      </div>

      
      {!user && (
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className={`btn btn-ghost btn-sm rounded-full transition-all ${
              isLandingPage
                ? "text-white hover:bg-white/10 border-white/20"
                : ""
            }`}
          >
            Log in
          </Link>
          <Link
            to="/register"
            className={`btn btn-primary btn-sm rounded-full shadow-lg shadow-primary/30 transition-all hover:scale-105 ${
              isLandingPage ? "text-white" : ""
            }`}
          >
            Create account
          </Link>
        </div>
      )}

    
      {user && (
        <div className="flex items-center gap-4">
          <span
            className={`hidden sm:inline-block text-sm font-medium transition-all ${
              isLandingPage ? "text-white/90" : "text-base-content/80"
            }`}
          >
            Welcome, {user?.firstName}
          </span>

          
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar online transition-all hover:scale-110"
            >
              <div className="w-11 rounded-full ring-2 ring-primary/50 ring-offset-2 ring-offset-base-100 transition-all hover:ring-primary">
                <img
                  alt="User avatar"
                  src={user.photoUrl || "/placeholder.svg"}
                  className="object-cover"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-10 p-3 shadow-2xl bg-base-100 rounded-2xl w-56 border border-base-300/50 gap-1 backdrop-blur-sm"
            >
              <li className="menu-title text-xs uppercase tracking-wider opacity-60 px-2 pt-1 pb-2">
                Account
              </li>
              <li>
                <Link
                  to="/profile"
                  className="flex justify-between items-center rounded-lg transition-all hover:bg-primary/10"
                >
                  <span className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Profile
                  </span>
                  <span className="badge badge-primary badge-sm">New</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="rounded-lg transition-all hover:bg-primary/10 flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  className="rounded-lg transition-all hover:bg-primary/10 flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  Requests
                </Link>
              </li>

              <div className="divider my-1 px-2" />

              <li>
                <a
                  onClick={handleLogout}
                  className="text-error rounded-lg hover:bg-error/10 transition-all flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
