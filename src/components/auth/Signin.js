import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signin } from "../../store/actions/authActions";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import MainBar from "../Main/MainBar";

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
    <>
    <MainBar/>
    <center>
      <div className="home">
        <h1
        style={{
          marginLeft:"160px",
        }}>  Made With Love By Lightning Team⚡  </h1>
  
            <div>
                <figure>
                    <img
                    className="main-pic"
                     src="https://www.bgnevents.com/wp-content/uploads/2016/03/bgn-event-about-us.jpg" alt="Image"/>

                </figure>    
              </div>
      </div>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Signin</h2>
        <hr style={{ width: "35%" }} />
        <input
          placeholder="enter username"
          id="username"
          type="text"
          className="form-control in"
          {...register("username", { required: true })}
        />
        {errors.username && errors.username.type === "required" && (
          <span role="alert">username is required</span>
        )}
        <input
          placeholder="enter password"
          id="password"
          type="password"
          className="form-control in"
          {...register("password", { required: true })}
        />
        {errors.password && errors.password.type === "required" && (
          <span role="alert"> password is required</span>
        )}
        <br />
        <button 
        style={{backgroundColor:"darkcyan"}}
        type="submit" className="btn btn-dark">
          Submit
        </button>
        <p>
          don't have an account ?
          <Link className="link" to="/signup">
            &nbsp; signup
          </Link>{" "}
        </p>
      </form>
    </center>
    </>
  );
};

export default Signin;
