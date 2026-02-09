import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {

    }
  };
  if(!user) return;

    return (
    <div className="navbar bg-base-200/60 backdrop-blur-md shadow-lg sticky top-0 z-50 px-4 md:px-8">
      {/* ── Brand ── */}
      <div className="flex-1 flex items-center gap-3">
        <div className="avatar">
          <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
            <img
              src="https://thumbs.dreamstime.com/b/handshake-emoji-featuring-diverse-skin-tones-white-background-image-handshake-emoji-featuring-diverse-skin-tones-symbolizing-376082597.jpg"
              alt="GitTogether logo"
            />
          </div>
        </div>
        <Link
          to="/"
          className="btn btn-ghost text-xl font-bold tracking-tight normal-case hover:bg-transparent"
        >
          GitTogether
        </Link>
      </div>

      {/* ── User Section ── */}
      {user && (
        <div className="flex items-center gap-4">
          {/* Welcome text — hidden on small screens */}
          <span className="hidden sm:inline-block text-sm font-medium opacity-80">
            {"Welcome, " + user?.firstName + " " + user?.lastName}
          </span>

          {/* Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar online"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                <img alt="User avatar" src={user.photoUrl || "/placeholder.svg"} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-3 shadow-xl bg-base-100 rounded-box w-56 border border-base-300 gap-1"
            >
              <li className="menu-title text-xs uppercase tracking-wider opacity-50 px-2 pt-1 pb-2">
                Account
              </li>
              <li>
                <Link
                  to="/profile"
                  className="flex justify-between items-center rounded-lg"
                >
                  Profile
                  <span className="badge badge-primary badge-sm">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="rounded-lg">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="rounded-lg">
                  Requests
                </Link>
              </li>

              <div className="divider my-1 px-2" />

              <li>
                <a
                  onClick={handleLogout}
                  className="text-error rounded-lg hover:bg-error/10"
                >
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
