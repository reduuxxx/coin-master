import React from "react";

const Loader = () => {
  return (
    <div className="text-center d-flex justify-content-center mt-5">
      <div className="spinner-grow" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
