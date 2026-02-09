import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const RegisterUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const handleRegister = async () => {
    try {
        setError("");
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true },
      );
      
      dispatch(addUser(res?.data?.user));  
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/profile");
      }, 1000);    
      
    } catch (error) {
        console.log(error)
      setError(error?.response?.data);
    }
  };
  return (
    <>
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Register User</h2>
            <div>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">First Name:</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name:</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Email Id:</span>
                  </div>
                  <input
                    type="text"
                    value={emailId}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                </label>
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Password</span>
                  </div>
                  <input
                    type="password"
                    value={password}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </label>
            </div>
            <p className="text-red-500 mx-auto">{error}</p>
            <div className="card-actions justify-center m-2">
              <button className="btn btn-primary" onClick={handleRegister}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>User Created Successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterUser;
