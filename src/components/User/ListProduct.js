import { useEffect, useState } from "react";
import { getAllProducts} from "../../services/apiService";
import '../../App.scss';

const ListProduct = (props) => {
  const [arrProduct, setArrProduct] = useState();
  useEffect(() => {
    getProductData();
  }, []);


  const getProductData = async () => {
    try {
      const res = await getAllProducts();
      if (res && res.data && res.status === 200) {
        setArrProduct(res.data);
      }
    } catch (err) {
      alert("Get data product failed");
    }
  };
  
  return (
    <>
      <div className="list-product-container">
        {arrProduct &&
          arrProduct.length > 0 &&
          arrProduct.map((item, index) => {
            return (
              <div key={`${index}-product`} className="card">
                <img src={item.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{item.productName}</h5>
                  <p className="card-text">
                    {item.price}đ
                  </p>
                  <a href="#" className="btn btn-primary">
                    View detail
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ListProduct;
