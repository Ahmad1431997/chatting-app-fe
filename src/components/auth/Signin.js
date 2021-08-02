import React from "react"; //Not needed
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

//Actions
import { signin } from "../../store/actions/authActions";

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const history = useHistory();

  const onSubmit = (data) => dispatch(signin(data, history));

  return (
    <center>
      <div className="home">
        <h1> Welcome To The Light Speed Chat </h1>
      </div>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Signin</h2>
        <hr style={{ width: "35%" }} /> {/*Remove inline styling */}
        <input
          placeholder="enter username"
          id="username"
          type="text"
          className="form-control in"
          {...register("username", { required: true })}
        />
        {errors.username && errors.username.type === "required" && (
          <span role="alert">You have to enter your username</span>
        )}
        <input
          placeholder="enter password"
          id="password"
          type="password"
          className="form-control in"
          {...register("password", { required: true })}
        />
        {errors.password && errors.password.type === "required" && (
          <span role="alert">You have to enter your password</span>
        )}
        <br /> {/*Remove break and add a margin instead */}
        <button type="submit" className="btn btn-dark">
          Submit
        </button>
        <p>
          <Link className="link" to="/signup">
            signup
          </Link>
          if you don't have an account {/*Replace with Don't have an account?*/}
        </p>
      </form>
    </center>
  );
};

export default Signin;
