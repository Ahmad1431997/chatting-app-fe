import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1> Welcome To The Light Speed Chat </h1>
      <p>
        <Link className="link" to="/signin">
          signin
        </Link>{" "}
        or{" "}
        <Link className="link" to="/signup">
          signup
        </Link>{" "}
        if you don't have an account
      </p>
    </div>
  );
};

export default Home;
