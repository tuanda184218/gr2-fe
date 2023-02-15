import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.scss";
import { postRegister } from '../../services/apiService'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'   

const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(["ROLE_USER"]);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSignup = async () => {
    //validate
    if (!username) {
      //   toast.warn('お名前を空白にすることはできません!')
      alert("Username can not be blanked!");
      return;
    }

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      //   toast.error('無効な電子メール!')
      alert("Invalid email!");
      return;
    }

    if (!password) {
      //   toast.warn('パスワードを空白にすることはできません!')
      alert("Password can not be blanked!");
      return;
    }


    try {
        let res = await postRegister(username, email, password, role);
        
        if (res.data && res.status === 200) 
        {
        //   localStorage.setItem('user', JSON.stringify(res.data))
            alert("Register successfully!");
            setTimeout(function () {
            return navigate('/login')
          }, 1000)
        }
      } catch (err) {
        alert('Username or email is existed!')
      }
  };

  return (
    <div className="signup-container">
      <div className="header col-4 mx-auto">Register</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event?.target?.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event?.target?.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="*******"
            value={password}
            onChange={(event) => setPassword(event?.target?.value)}
          />
        </div>

        <button type="submit" className="button" onClick={() => handleSignup()}>
          Register
        </button>
        <p className="forgot-password">
          Already registered <Link to={"/login"}>sign in?</Link>
        </p>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Signup;
