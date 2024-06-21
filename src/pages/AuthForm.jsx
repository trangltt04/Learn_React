import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import authSchema from "./schemaValid/authSchema";
import api from "../axios/indext";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ isRegister }) => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (isRegister) {
        await api.post(`/register`, data);
        if (confirm("Successfully, redirect to login page?")) {
          nav("/login");
        }
      } else {
        const res = await api.post(`/login`, data);
        localStorage.setItem("user", JSON.stringify(res.data));
        if (confirm("Successfully, redirect to admin page?")) {
          nav("/admin");
        }
      }
    } catch (error) {
      alert(error.response.data);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{isRegister ? "Register" : "Login"}</h1>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            {...register("email")}
          />
          {errors?.email && (
            <p className="text-danger">{errors?.email?.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register("password")}
          />
          {errors?.password && (
            <p className="text-danger">{errors?.password?.message}</p>
          )}
        </div>

        <div className="mb-3">
          <button className="btn btn-primary w-100">
            {isRegister ? "Register" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
