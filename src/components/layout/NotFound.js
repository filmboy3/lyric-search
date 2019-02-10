import React from "react";

const NotFoundPage = () => {
  return (
    <div className="NotFoundPage">
      <h1>Oops!</h1>
      <h2>Looks like you're lost ...</h2>
      <div className="action">
        <a className="btn btn-primary" href="/">
          Guide me to the right path!
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
