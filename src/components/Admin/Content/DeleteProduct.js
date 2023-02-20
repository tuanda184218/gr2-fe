import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteProduct } from "../../../services/apiService";
import { toast } from "react-toastify";
import _ from "lodash";

const DeleteProduct = (props) => {
  const { show, setShow, dataDelete} = props;

  const handleClose = () => {
    setShow(false);
  };

  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  useEffect(() => {
    if (!_.isEmpty(dataDelete)) {
        setProductId(dataDelete.id);
        setProductName(dataDelete.productName);
    }
  }, [props.show]);

  const handleSubmitDelete = async() => {
    try{   
        let res = await deleteProduct(productId);
        if(res.data && res.status === 200){
            toast.success("Delete product successfully");
            handleClose();
            await props.fetchListProduct();
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
            Are you sure to delete this user with productname = {productName}
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

export default DeleteProduct;
