import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../axios/indext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    })();
  }, []);
  return (
    <div>
      <div className="row">
        <h1>Chi tiết sản phẩm</h1>
        <div className="col-6">
          <img src={product.thumbnail} alt="" />
        </div>
        <div className="col-6">
          <h1>{product.title}</h1>
          <p>Giá: {product.price}</p>
          <p>Mô tả sản phẩm: {product.description}</p>
          <button className="btn btn-danger">Mua ngay</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
