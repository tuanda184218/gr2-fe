import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../../../services/apiService";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { toast } from "react-toastify";

const AddUser = (props) => {
  const{show, setShow} = props;

  const handleClose = () => {
    setShow(false);
    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRoles([]);
  };


  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roles, setRoles] = useState([]);

  const [isShowPassword, setIsShowPassword] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmitCreateUser = async () => {
    const isValidEmail = validateEmail(email);
    //validate
    if (!username) {
      alert("Username is not blank!");
      return;
    }
    if (!isValidEmail) {
      alert("Email is invalid!");
      return;
    }
    if (!password) {
      alert("Password is not blank!");
      return;
    } else {
      if (password !== confirmPassword) {
        alert("Confirm password is not correct!");
        return;
      }
    }
    if (!roles) {
      alert("Role is not blank!");
      return;
    }

    //call api
    try {
      let res = await postCreateUser(username, email, password, roles.map(
        (item) => item.name
      ));
      if (res.data && res.status === 200) {
        toast.success("Create user successfully");
        handleClose();
        await props.fetchListUsers();
      }
    } catch (err) {
      console.log(err);
      alert("Username or email existed!");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>CREATE A NEW USER</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <form className="row g-3 form-group">
            <div className="col-6">
              <label className="form-label">Username</label>
              <input
                type="username"
                className="form-control"
                value={username}
                onChange={(event) => setUserName(event?.target?.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event?.target?.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label pass-label">Password</label>
              <input
                type={isShowPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event?.target?.value)}
              />
              {isShowPassword ? (
                <span
                  className="icon-eye"
                  onClick={() => setIsShowPassword(false)}
                >
                  <AiFillEye />
                </span>
              ) : (
                <span
                  className="icon-eye"
                  onClick={() => setIsShowPassword(true)}
                >
                  <AiFillEyeInvisible />
                </span>
              )}
            </div>
            <div className="col-6">
              <label className="form-label">Confirm password</label>
              <input
                type={isShowPassword ? "text" : "password"}
                className="form-control"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event?.target?.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Role</label>
              <br />
              <input
                type="checkbox"
                id="user"
                name="ROLE_USER"
                value="ROLE_USER"
                onChange={(event)=>{
                  if(roles.filter(role => role.name === event.target.value).length !== 0){
                      setRoles([...roles.filter(role => role.name !== event.target.value)])
                  } else {
                    setRoles([...roles,{id:1,name:event.target.value}])
                  }
                }}
              />
              <label htmlFor="user"> ROLE_USER</label>
              <br />
              <input
                type="checkbox"
                id="mod"
                name="ROLE_MODERATOR"
                value="ROLE_MODERATOR"
                onChange={(event)=>{
                  if(roles.filter(role => role.name === event.target.value).length !== 0){
                      setRoles([...roles.filter(role => role.name !== event.target.value)])
                  } else {
                    setRoles([...roles,{id:2,name:event.target.value}])
                  }
                }}
              />
              <label htmlFor="mod">ROLE_MODERATOR</label>
              <br />
              <input
                type="checkbox"
                id="admin"
                name="ROLE_ADMIN"
                value="ROLE_ADMIN"
                onChange={(event)=>{
                  if(roles.filter(role => role.name === event.target.value).length !== 0){
                      setRoles([...roles.filter(role => role.name !== event.target.value)])
                  } else {
                    setRoles([...roles,{id:3,name:event.target.value}])
                  }
                }}
              />
              <label htmlFor="admin">ROLE_ADMIN</label>
              <br />
              {/* <select
                defaultValue={"user"}
                className="form-select"
                onChange={(event) => setRole([event?.target?.value])}
              >
                <option value={"user"}>ROLE_USER</option>
                <option value={"mod"}>ROLE_MODERATOR</option>
                <option value={"admin"}>ROLE_ADMIN</option>
              </select> */}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmitCreateUser();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddUser;
