import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    
      <div className="flex justify-center mt-60">
        <div>
          <h1>OOPS!!</h1>
          <h2>Something Went Wrong</h2>
          <h3>
            {error?.status}: {error?.error?.message}
          </h3>
        </div>
      </div>
    
  );
};

export default Error;
