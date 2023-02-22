import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import './ManageProduct.scss';
import { useSelector } from "react-redux";
import _ from "lodash";
import { postCreateProduct } from "../../../services/apiService";
import { toast } from "react-toastify";

const AddProduct = (props) => {
  const { show, setShow } = props
  const account = useSelector(state => state.user.account)
  const userId = account.id;
  const handleClose = () => {
    setShow(false);
    setProductName("");
    setPrice("");
    setDescription("");
    setImage("");
    setPreviewImage("");
  };

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

  const handleSubmitCreateProduct = async () => {
    //validate
    if (!productName) {
      toast.warn("Name is not blanked!");
      return;
    }
    if (!price) {
      toast.warn("Price is not blanked!");
      return;
    }
    if (!description) {
      toast.warn("Year is not blanked!");
      return;
    }
    if (!image) {
      toast.warn("Image is not blanked!");
      return;
    }

    try {
     let res = await postCreateProduct(userId,productName,description,price,image)
     if(res && res.data && res.status === 200){
      toast.success(res.data.message);
      handleClose();
      await props.fetchListProduct();
     }
    } catch (err) {
      toast.error("Create product failed!");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}  size="xl" backdrop="static" className="modal-add-product">
        <Modal.Header closeButton>
          <Modal.Title>CREATE A NEW PRODUCT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-6">
              <label className="form-label">Name</label>
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
              handleSubmitCreateProduct();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddProduct;
