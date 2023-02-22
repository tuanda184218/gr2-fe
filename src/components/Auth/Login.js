import { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import {ImSpinner10} from "react-icons/im";
import { toast } from "react-toastify";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    //validate
    if (!username) {
      toast.warn("Username can not be blank!");
      return;
    }

    if (!password) {
      toast.warn("Password can not be blank!");
      return;
    }

    setIsLoading(true);

    //submit api

    try {
      let res = await postLogin(username, password);
      dispatch(doLogin(res));

      if (res.data && res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success("Login successfully");
        setIsLoading(false);
        setTimeout(function () {
          return navigate("/");
        }, 2000);
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("Username or password is not correct!");
    }
  };

  const handleKeyDown = (event) => {
    if(event && event.key === "Enter"){
      handleLogin();
    }
  }

  return (
    <div className="signin-container">
      <div className="header col-4 mx-auto">LOGIN</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Username</label>
          <input
            type="username"
            className="form-control"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event?.target?.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event?.target?.value)}
            onKeyDown={(event)=>handleKeyDown(event)}
          />
        </div>

        <button type="submit" className="button" onClick={() => handleLogin()} disabled={isLoading}>
          {isLoading === true && <ImSpinner10 className="loader-icon"/>}
          <span>Login</span>
        </button>
        <p className="forgot-password">
          <Link to={"/reset-pass"}>Password forgot?</Link>
        </p>
        <p className="register">
          Account not existed?
          <Link to={"/signup"}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
