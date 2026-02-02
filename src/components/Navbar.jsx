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

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex flex-1 flex-row">
        <img
          src="https://thumbs.dreamstime.com/b/handshake-emoji-featuring-diverse-skin-tones-white-background-image-handshake-emoji-featuring-diverse-skin-tones-symbolizing-376082597.jpg"
          alt="Error"
          className="h-10 rounded-3xl"
        />
        <Link to="/" className="btn btn-ghost text-xl">
          {" "}
          GitTogether
        </Link>
      </div>
      {user && (
        <div className="flex">
          <p className="mr-10 mt-2">
            {"Welcome, " + user.firstName + " " + user.lastName}{" "}
          </p>
          <div className="flex gap-2 mr-10">
            <div className="dropdown dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div>
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user.photoUrl}
                    />
                  </div>
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
