import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          {/* Animated icon */}
          <div className="text-8xl mb-6 animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block h-24 w-24 text-error"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl font-bold text-base-content">OOPS!!</h1>

          {/* Divider */}
          <div className="divider" />

          {/* Sub heading */}
          <h2 className="text-2xl font-semibold text-base-content/70 mb-4">
            Something Went Wrong
          </h2>

          {/* Error details badge */}
          {error?.status && (
            <div className="badge badge-error badge-lg gap-2 p-4 text-base mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
              </svg>
              {error?.status}: {error?.error?.message}
            </div>
          )}

          {/* Description */}
          <p className="text-base-content/50 mb-8">
            {"The page you're looking for might have been removed, had its name changed, or is temporarily unavailable."}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              className="btn btn-primary"
              onClick={() => window.location.replace("/")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Go Home
            </button>
            <button
              className="btn btn-outline btn-secondary"
              onClick={() => window.location.reload()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182"
                />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
