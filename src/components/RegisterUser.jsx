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

  const fields = [
    {
      label: "First Name",
      type: "text",
      value: firstName,
      onChange: (e) => setFirstName(e.target.value),
      placeholder: "",
    },
    {
      label: "Last Name",
      type: "text",
      value: lastName,
      onChange: (e) => setLastName(e.target.value),
      placeholder: "",
    },
    {
      label: "Email",
      type: "text",
      value: emailId,
      onChange: (e) => setEmailId(e.target.value),
      placeholder: "abc@example.com",
    },
    {
      label: "Password",
      type: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      placeholder: "Enter a strong password",
    },
  ];

   return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-2xl">
          <div className="card-body gap-6">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight">
                Create Account
              </h2>
              <p className="text-sm text-base-content/60 mt-1">
                Fill in your details to get started
              </p>
            </div>

            
            <div className="divider my-0" />

            
            <div className="flex flex-col gap-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.slice(0, 2).map((field) => (
                  <label key={field.label} className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-medium">
                        {field.label}
                      </span>
                    </div>
                    <input
                      type={field.type}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={field.placeholder}
                      className="input input-bordered w-full focus:input-primary transition-colors"
                    />
                  </label>
                ))}
              </div>

              

              {fields.slice(2).map((field) => (
                <label key={field.label} className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-medium">
                      {field.label}
                    </span>
                  </div>
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={field.placeholder}
                    className="input input-bordered w-full focus:input-primary transition-colors"
                  />
                </label>
              ))}
            </div>

        
        

            {error && (
              <div className="alert alert-error text-sm py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
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

      
      
            <button
              className="btn btn-primary w-full text-base"
              onClick={handleRegister}
            >
              Register
            </button>

          
          
            <p className="text-center text-sm text-base-content/60">
              Already have an account?{" "}
              <a className="link link-primary font-medium" href="/login">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>

    
    
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>User Created Successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterUser;
