import { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { useDispatch } from "react-redux";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    //validate
    if (!username) {
      alert("Username can not be blank!");
      return;
    }

    if (!password) {
      alert("Password can not be blank!");
      return;
    }

    //submit api

    try {
      let res = await postLogin(username, password);
      dispatch({
        type: "FETCH_USER_LOGIN_SUCCESS",
        payload: res,
      });

      if (res.data && res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        alert("Login successfully");
        setTimeout(function () {
          return navigate("/");
        }, 1000);
      }
    } catch (err) {
      alert("Username or password is not correct!");
    }
  };

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
          />
        </div>

        <button type="submit" className="button" onClick={() => handleLogin()}>
          Login
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
