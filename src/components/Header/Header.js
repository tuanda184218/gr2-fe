import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from "react-router-dom";
import { postLogout } from "../../services/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";

const Header = (props) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated )
  const dispatch = useDispatch();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogOut = async() =>{
    let res = await postLogout();
    if(res && res.status === 200){
      // clear data redux
      dispatch(doLogout());
      toast.success(res.data.message);
      navigate("/login");
    } else {
      toast.error("Logout failed");
    }
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavLink to="/" className="navbar-brand">
          MY_APP
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/users" className="nav-link">
              Users
            </NavLink>
            <NavLink to="/admins" className="nav-link">
              Admin
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated === false ?
            <>
            <button className="btn-login" onClick={() => handleLogin()}>
              Log in
            </button>
            <button className="btn-signup" onClick={() => handleSignup()}>
              Sign up
            </button>
            </> :
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>handleLogOut()}>Log out</NavDropdown.Item>
            </NavDropdown>
          }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
