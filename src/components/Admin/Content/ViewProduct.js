import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import './ManageProduct.scss';

const ViewProduct = (props) => {
  const { show, setShow, dataView } = props;

  const handleClose = () => {
    setShow(false);
    setProductName("");
    setDescription("");
    setPrice("");
    setPreviewImage("");
  };

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [previewImage, setPreviewImage] = useState("");



  useEffect(() => {
    if (!_.isEmpty(dataView)) {
      setProductName(dataView.productName);
      setDescription(dataView.description);
      setPrice(dataView.price);
      setPreviewImage(dataView.image);
    }
  }, [props.show]);


  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-product"
      >
        <Modal.Header closeButton>
          <Modal.Title>VIEW PRODUCT</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <form className="row g-3 form-group">
            <div className="col-6">
              <label className="form-label">ProductName</label>
              <input
                type="productName"
                className="form-control"
                value={productName}
                onChange={() => null}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={() => null}
              />
            </div>

            <div className="col-6">
              <label className="form-label">Price</label>
              <input
                type="text"
                className="form-control"
                value={price}
                onChange={() => null}
              />
            </div>
           
            <div className="col-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span>No image</span>
              )}
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

export default ViewProduct;
