import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { putUpdateUser } from "../../../services/apiService";
import { toast } from "react-toastify";
import _ from "lodash";

const UpdateUser = (props) => {
  const { show, setShow, dataUpdate } = props;

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setRoles([]);
  };

  const [userID, setUserId] = useState("");
  const [username, setUsername] = useState("");
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

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setUserId(dataUpdate.id);
      setUsername(dataUpdate.username);
      setEmail(dataUpdate.email);
      setRoles(dataUpdate.roles);
    }
  }, [props.show]);

  const handleHanleUserRoleCheckbox = (event) => {
    if (roles.filter((role) => role.name === event.target.value).length !== 0) {
      setRoles([...roles.filter((role) => role.name !== event.target.value)]);
    } else {
      setRoles([...roles, { id: 1, name: event.target.value }]);
    }
  };

  const handleSubmitUpdateUser = async () => {
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
    if (!roles) {
      alert("Role is not blank!");
      return;
    }

    //call api
    try {
      let res = await putUpdateUser(
        userID,
        email,
        roles.map((item) => item.name)
      );
      if (res.data && res.status === 200) {
        toast.success("Update user successfully");
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
        className="modal-update-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>UPDATE USER</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <form className="row g-3 form-group">
            <div className="col-6">
              <label className="form-label">Username</label>
              <input
                type="username"
                className="form-control"
                value={username}
                onChange={() => null}
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

            <div className="col-md-6">
              <label className="form-label">Role</label>
              <br />
              <input
                type="checkbox"
                id="user"
                name="ROLE_USER"
                value="ROLE_USER"
                checked={ roles.filter((role) => role.name === "ROLE_USER").length !==0}
                // checked={isUserSelected}
                onChange={(event) => handleHanleUserRoleCheckbox(event)}
              />
              <label htmlFor="user"> ROLE_USER</label>
              <br />
              <input
                type="checkbox"
                id="mod"
                name="ROLE_MODERATOR"
                value="ROLE_MODERATOR"
                // checked={isModSelected}
                checked={roles.filter(role => role.name === "ROLE_MODERATOR").length !== 0}
                onChange={(event) => handleHanleUserRoleCheckbox(event)}
              />
              <label htmlFor="mod">ROLE_MODERATOR</label>
              <br />
              <input
                type="checkbox"
                id="admin"
                name="ROLE_ADMIN"
                value="ROLE_ADMIN"
                // checked={isAdminSelected}
                checked={roles.filter(role => role.name === "ROLE_ADMIN").length !== 0}
                onChange={(event) => handleHanleUserRoleCheckbox(event)}
              />
              <label htmlFor="admin">ROLE_ADMIN</label>
              <br />
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
              handleSubmitUpdateUser();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateUser;
