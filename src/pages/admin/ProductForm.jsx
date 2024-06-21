import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import api from "../../axios/indext";
import productSchame from "./../schemaValid/productSchema";

const ProductForm = ({ handleProduct }) => {
  const { id } = useParams();
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
