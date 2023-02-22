import { useState, useEffect } from "react";
import { GrAdd } from "react-icons/gr";
import AddProduct from "./AddProduct";
import TableProductPaginage from "./TableProductPaginage";
import { getAllProducts } from "../../../services/apiService";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";
import ViewProduct from "./ViewProduct";
import { toast } from "react-toastify";

const ManageProduct = (props) => {
  const [showCreateProduct, setShowCreateProduct] = useState(false);

  const [listProducts, setListProducts] = useState([]);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [showViewProduct, setShowViewProduct] = useState(false);
  const [showDeleteProduct, setShowDeleteProduct] = useState(false);

  const [dataUpdate, setDataUpdate] = useState({});
  const [dataView, setDataView] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const handleClickBtnUpdate = (product) => {
    setShowUpdateProduct(true);
    setDataUpdate(product);
  };

  const handleClickBtnView = (product) => {
    setShowViewProduct(true);
    setDataView(product);
  };

  const handleClickBtnDelete = (product) => {
    setShowDeleteProduct(true);
    setDataDelete(product)
  };

  useEffect(()=>{
    fetchListProduct();
  },[])

  const fetchListProduct = async() => {
    try{
      let res = await getAllProducts();
      if(res && res.data && res.status === 200){
        setListProducts(res.data);
      }
    }catch(err){
      toast.error("Get data product failed");
    }
  }
   return (
    <div className="manage-product-container">
      <div className="title">Manager product</div>
      <div className="products-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateProduct(true)}
          >
            <GrAdd />
            ADD A NEW PRODUCT
          </button>
        </div>
        <div className="table-products-container">
          <TableProductPaginage
            listProducts={listProducts}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
          />
        </div>
        <AddProduct show={showCreateProduct} setShow={setShowCreateProduct} fetchListProduct={fetchListProduct}/>
        <UpdateProduct show={showUpdateProduct}
          setShow={setShowUpdateProduct}
          dataUpdate={dataUpdate}
          fetchListProduct={fetchListProduct}/>
        <DeleteProduct
          show={showDeleteProduct}
          setShow={setShowDeleteProduct}
          dataDelete={dataDelete}
          fetchListProduct={fetchListProduct}
        />
        <ViewProduct
           show={showViewProduct}
           setShow={setShowViewProduct}
           dataView={dataView}
           fetchListProduct={fetchListProduct}
        />
      </div>
    </div>
  );
};

export default ManageProduct;
