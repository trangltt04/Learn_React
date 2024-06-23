import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthForm from "./components/AuthForm";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/footer";
import Header from "./components/header";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/admin/Home";
import ProductForm from "./pages/admin/ProductForm";
import ProductDetail from "./pages/admin/ProductDetail";
import About from "./pages/admin/About";
import LayoutClient from "./components/LayoutClient";
import LayoutAdmin from "./components/LayoutAdmin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutClient />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
        </Route>

        <Route path="/admin" element={<PrivateRoute />}>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/product-add" element={<ProductForm />} />
            <Route path="/admin/product-edit/:id" element={<ProductForm />} />
          </Route>
        </Route>

        <Route path="/register" element={<AuthForm isRegister />} />
        <Route path="/login" element={<AuthForm />} />
      </Routes>
    </>
  );
}

export default App;
