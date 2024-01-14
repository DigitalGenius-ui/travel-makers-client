import React from "react";

const ErrorApi = ({ errorText }) => {
  return (
    <div className="w-full h-screen grid place-items-center text-rose-500 text-lg">
      {errorText}
    </div>
  );
};

export default ErrorApi;
