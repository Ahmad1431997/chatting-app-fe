import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signup } from "../../store/actions/authActions";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import MainBar from "../Main/MainBar";

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => dispatch(signup(data, history));
  return (
    <>
    <MainBar/>
    <center>
      <div className="home">
        <h2 style={{
          marginLeft:"160px"
        }}> Made With Love By The Lightning Team⚡ </h2>
        <div>
                <figure>
                    <img
                    className="main-pic"
                     src="https://www.bgnevents.com/wp-content/uploads/2016/03/bgn-event-about-us.jpg" alt="Image"/>

                </figure>    
              </div>
      </div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
      
      <h2>Signup</h2>
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
        <span role="alert">password is required</span>
      )}

      <input
        placeholder="enter full name"
        id="fullname"
        type="text"
        className="form-control in"
        {...register("fullname", { required: true })}
      />
      {errors.fullname && errors.fullname.type === "required" && (
        <span role="alert">fullname is required</span>
      )}
     
      <input
        placeholder="enter your email"
        id="email"
        type="email"
        className="form-control in"
        {...register("email", { required: true })}
      />
      {errors.email && errors.email.type === "required" && (
        <span role="alert">email is required</span>
      )}
      
      <br />
      <button 
      style={{backgroundColor:"darkcyan"}}
      
      type="submit" className="btn btn-dark">
        Submit
      </button>
      <p>
        Already have an account ?
        <Link className="link" to="/signin">
          &nbsp; signin
        </Link>
      </p>
    </form>
    </center>
    </>
  );
};

export default Signup;














