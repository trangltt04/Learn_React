import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import authSchema from "./schemaValid/authSchema";
import api from "../axios/indext";
import Button from "../components/Button";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
  });
  const onSubmit = (data) => {
    //console.log(data);
    (async () => {
      try {
        const res = await api.post(`/register`, data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center">Register</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            {...register("email", { required: true })}
          />
          {errors.email?.message && (
            <p className="text-danger">{errors.email?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register("password", { required: true })}
          />
          {errors.password?.message && (
            <p className="text-danger">{errors.password?.message}</p>
          )}
        </div>

        <div className="mb-3">
          <Button width="100%">Register</Button>
        </div>
      </form>
    </>
  );
};

export default Register;
