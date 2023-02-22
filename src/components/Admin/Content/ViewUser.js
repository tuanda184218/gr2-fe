import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";

const ViewUser = (props) => {
  const { show, setShow, dataView } = props;

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setRoles([]);
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([]);


  useEffect(() => {
    if (!_.isEmpty(dataView)) {
      setUsername(dataView.username);
      setEmail(dataView.email);
      setPassword(dataView.password);
      setRoles(dataView.roles);
    }
  }, [props.show]);



  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-view-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>VIEW USER</Modal.Title>
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
                onChange={(event) => null}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Role</label>
              <br />
              <input
                type="checkbox"
                id="user"
                name="ROLE_USER"
                value="ROLE_USER"
                checked={ roles.filter((role) => role.name === "ROLE_USER").length !==0}
                onChange={()=>null}
              />
              <label htmlFor="user"> ROLE_USER</label>
              <br />
              <input
                type="checkbox"
                id="mod"
                name="ROLE_MODERATOR"
                value="ROLE_MODERATOR"
                checked={roles.filter(role => role.name === "ROLE_MODERATOR").length !== 0}
                onChange={()=>null}
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
                onChange={()=>null}
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
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewUser;
