import AddProduct from "./AddProduct";

const ManageProduct = (props) =>{
    return(
        <div className="manage-product-container">
            <div className="title">
                Manager usser
            </div>
            <div className="products-content">
                <div>
                    table product
                </div>
                <AddProduct/>
            </div>
        </div>
    )
}

export default ManageProduct;