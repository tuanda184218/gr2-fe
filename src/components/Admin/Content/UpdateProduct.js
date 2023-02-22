import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { putUpdateProduct } from "../../../services/apiService";
import { toast } from "react-toastify";
import {FcPlus} from "react-icons/fc";
import _ from "lodash";
import './ManageProduct.scss';

const UpdateProduct = (props) => {
  const { show, setShow, dataUpdate } = props;

  const handleClose = () => {
    setShow(false);
    setProductName("");
    setDescription("");
    setPrice("");
    setImage("");
    setPreviewImage("");
  };

  const [productID, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      // setPreviewImage("");
    }
  };


  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setProductId(dataUpdate.id);
      setProductName(dataUpdate.productName);
      setDescription(dataUpdate.description);
      setPrice(dataUpdate.price);
      setImage(dataUpdate.image);
      setPreviewImage(dataUpdate.image);
    }
  }, [props.show]);


  const handleSubmitUpdateUser = async () => {
    //validate
    if (!productName) {
      toast.warn("ProductName is not blank!");
      return;
    }
    if (!description) {
      toast.warn("Description is invalid!");
      return;
    }
    if (!price) {
      toast.warn("Price is not blank!");
      return;
    }

    if (!image) {
        toast.warn("Image is not blank!");
        return;
    }

    //call api
    try {
      let res = await putUpdateProduct(
        productID,
        productName,
        description,
        price,
        image
      );
      if (res.data && res.status === 200) {
        toast.success("Update product successfully");
        handleClose();
        await props.fetchListProduct();
      }
    } catch (err) {
      console.log(err);
      toast.error("Username or email existed!");
    }
  };

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
          <Modal.Title>UPDATE PRODUCT</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <form className="row g-3 form-group">
            <div className="col-6">
              <label className="form-label">ProductName</label>
              <input
                type="productName"
                className="form-control"
                value={productName}
                onChange={(event) => setProductName(event?.target?.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event?.target?.value)}
              />
            </div>

            <div className="col-6">
              <label className="form-label">Price</label>
              <input
                type="text"
                className="form-control"
                value={price}
                onChange={(event) => setPrice(event?.target?.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label label-upload" htmlFor="labelUload">
                <FcPlus />
                Upload File Image
              </label>
              <input
                type="file"
                hidden
                id="labelUload"
                className="form-control"
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="col-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span>Preview Image</span>
              )}
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

export default UpdateProduct;
