import React, { createContext, useEffect, useReducer } from "react";
import api from "../axios/indext";
import productReducer from "../reducers/productReducer";

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const [state, dispatch] = useReducer(productReducer, { products: [] });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("products");
        dispatch({ type: "SET_PRODUCTS", payload: data });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
