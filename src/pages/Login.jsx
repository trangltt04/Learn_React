import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import authSchema from "./schemaValid/authSchema";
import api from "../axios/indext";
import { useNavigate } from "react-router-dom";
import Button from "./../components/Button";

const Login = () => {
  const nav = useNavigate();
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
        await api.post(`/login`, data);
        if (confirm("Login successfully, redirect home page? ")) {
          nav("/");
        }
      } catch (error) {
        alert(error?.response.data);
      }
    })();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center">Login</h1>
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
          {/* <button type="submit" className="btn btn-primary w-100">
            Login
          </button> */}
          <Button width="100%">Login</Button>
        </div>
      </form>
    </>
  );
};

export default Login;
