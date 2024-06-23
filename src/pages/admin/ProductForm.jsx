import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../axios/indext";
import productSchame from "./../schemaValid/productSchema";
import { ProductContext } from "../../contexts/ProductContext";

const ProductForm = () => {
  const { dispatch } = useContext(ProductContext);
  const { id } = useParams();
  const nav = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(productSchame) });

  if (id) {
    useEffect(() => {
      (async () => {
        const { data } = await api.get(`/products/${id}`);
        reset(data);
      })();
    }, []);
  }

  const handleProduct = async (data) => {
    if (id) {
      await api.patch(`/products/${id}`, data);
      dispatch({ type: "EDIT_PRODUCT", payload: { id, ...data } });
    } else {
      const res = await api.post(`/products`, data);
      dispatch({ type: "ADD_PRODUCT", payload: res.data });
    }
    if (confirm("Successfully, redirect to admin page?")) {
      nav("/admin");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit((data) => handleProduct({ ...data, id }))}>
        <h1>{id ? "Edit product" : "Add product"}</h1>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            {...register("title")}
          />
          {errors?.title && (
            <p className="text-danger">{errors?.title?.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            {...register("price", { require: true, valueAsNumber: true })}
          />
          {errors?.price && (
            <p className="text-danger">{errors?.price?.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            {...register("description")}
          />
        </div>

        <div className="mb-3">
          <button className="btn btn-primary w-100">
            {id ? "Edit product" : "Add product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
