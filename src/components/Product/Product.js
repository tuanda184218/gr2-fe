import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { GrAdd } from "react-icons/gr";
import "./Product.scss";
import { useNavigate } from "react-router-dom";
import { postCreateProduct, postImage } from "../../services/apiService";
import { API_URL } from "../../services/apiService";

const Product = (props) => {
  //   const { show, setShow } = props
  const navigate = useNavigate();
  const [show, setShow] = useState("");
  const handleClose = () => {
    setShow(false);
    setProductName("");
    setPrice("");
    setYear("");
    setImage("");
    setUrl("");
    setPreviewImage("");
  };

  const handleShow = () => setShow(true);

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
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
      alert("Name is not blanked!");
      return;
    }
    if (!price) {
      alert("Price is not blanked!");
      return;
    }
    if (!year) {
      alert("Year is not blanked!");
      return;
    }
    if (!image) {
      alert("Image is not blanked!");
      return;
    }

    try {
      let response = await postImage(image);
      // if (response && response.data && response.data.data) {
      //   setUrl(API_URL + "api/products/FileUpload/files/" + response.data.data);
      // }
      let res = await postCreateProduct(
        productName,
        price,
        year,
        `${API_URL}api/products/FileUpload/files/${response.data.data}`
      );
      // let res = await postCreateProduct(productName, price, year, url);
      if (res.data && res.status === 200) {
        alert("Insert product successfully");
      }
    } catch (err) {
      console.log(err);
      alert("Product name existed!");
    }
  };

  return (
    <>
      <Button variant="btn btn-primary" onClick={handleShow}>
        <GrAdd className="add-botton" />
        ADD A NEW PRODUCT
      </Button>
      <Modal show={show} onHide={handleClose} className="modal-add-product">
        <Modal.Header closeButton>
          <Modal.Title>CREATE A NEW PRODUCT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-12">
              <label className="form-label">Name</label>
              <input
                type="productName"
                className="form-control"
                value={productName}
                onChange={(event) => setProductName(event?.target?.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Price</label>
              <input
                type="text"
                className="form-control"
                value={price}
                onChange={(event) => setPrice(event?.target?.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Year</label>
              <input
                type="year"
                className="form-control"
                value={year}
                onChange={(event) => setYear(event?.target?.value)}
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
            {/* <div className="col-md-6">
                            <label className="form-label">State</label>
                            <select className="form-select" >
                                <option selected>TODO</option>
                                <option>DOING</option>
                                <option>DONE</option>
                            </select>
                        </div> */}
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

export default Product;
