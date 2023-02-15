import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../../services/apiService";
import { toast } from "react-toastify";
import _ from "lodash";

const DeleteUser = (props) => {
  const { show, setShow, dataDelete} = props;

  const handleClose = () => {
    setShow(false);
  };

  const [userId, setUserID] = useState("");
  const [username, setUserName] = useState("");
  useEffect(() => {
    if (!_.isEmpty(dataDelete)) {
        setUserID(dataDelete.id);
        setUserName(dataDelete.username);
    }
  }, [props.show]);

  const handleSubmitDelete = async() => {
    try{   
        let res = await deleteUser(userId);
        if(res.data && res.status === 200){
            toast.success("Delete user successfully");
            handleClose();
            await props.fetchListUsers();
        }
    } catch(err){
        alert("Something wrong!")
    }
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        className="modal-delete-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>DELETE USER</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
            Are you sure to delete this user with username = {username}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
                handleSubmitDelete();
              }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteUser;
