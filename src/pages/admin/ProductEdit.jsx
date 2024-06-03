import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../axios/indext";
// import * as z from "zod";
import productSchema from "./../schemaValid/productSchema";

// const productSchame = z.object({
//   title: z.string().min(6).max(100),
//   price: z.number().min(0),
//   description: z.string().optional(),
// });

const ProductEdit = ({ onEdit }) => {
  const { id } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resoler: zodResolver(productSchema) });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        reset(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const onSubmit = (data) => {
    // console.log(data);
    // console.log({...data, id });
    onEdit({ ...data, id });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Product Edit</h2>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            {...register("title", { required: true })}
          />
          {errors.title?.message && (
            <p className="text-danger">{errors.title?.message}</p>
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
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors.price?.message && (
            <p className="text-danger">{errors.price?.message}</p>
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
          {errors.description?.message && (
            <p className="text-danger">{errors.description?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <button className="btn btn-primary w-100" type="submit">
            Edit Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
