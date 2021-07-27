import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signin } from "../../store/actions/authActions";

const Signin = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signin(user, history));
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <>
      <h2>Signin</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <div style={{ width: "350px" }} className="form-group">
          <input
            type="text"
            className="form-control in"
            placeholder="enter username"
            onChange={handleChange}
            name="username"
            value={user.username}
            required
          />
        </div>
        <div style={{ width: "350px" }} className="form-group">
          <input
            type="password"
            className="form-control in"
            placeholder="enter your password"
            onChange={handleChange}
            name="password"
            value={user.password}
            required
          />
        </div>
        <center>
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </center>
      </form>
    </>
  );
};

export default Signin;
