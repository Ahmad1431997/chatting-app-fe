import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signup } from "../../store/actions/authActions";


const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const resetForm = () => {
    setUser({
      fullname: "",
      username: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signup(user, history));
    resetForm();
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <h2 >Signup</h2>
      <hr/>
      <form onSubmit={handleSubmit}>
        <div style={{ width: "350px" }} className="form-group">
        
          <input
            type="text"
            className="form-control in"
          
            placeholder="enter full name"
            onChange={handleChange}
            name="fullname"
            value={user.fullname}
          />
        </div>
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
            type="email"
            className="form-control in"
           
            placeholder="enter your email"
            onChange={handleChange}
            name="email"
            value={user.email}
            required
          />
        </div>

        <div style={{ width: "350px" }} className="form-group">
         

          <input
            type="password"
            className="form-control in"
           
            placeholder="enter password"
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
    </div>
  );
};

export default Signup;
