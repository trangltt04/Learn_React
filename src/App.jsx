import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import api from "./axios/indext";
import Footer from "./components/footer";
import Header from "./components/header";
import About from "./pages/About";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/admin/Dashboard";
import ProductForm from "./pages/admin/ProductForm";
import AuthForm from "./components/AuthForm";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [products, setProducts] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await api.get("products");
      setProducts(data);
    })();
  }, []);

  const handleProduct = async (data) => {
    if (data.id) {
      await api.patch(`/products/${data.id}`, data);
      const newData = await api.get("/products");
      setProducts(newData.data);
    } else {
      const res = await api.post(`/products`, data);
      setProducts([...products, res.data]);
    }
    if (confirm("Successfully, redirect to admin page?")) {
      nav("/admin");
    }
  };

  const handleRemove = (id) => {
    console.log(id);
    (async () => {
      try {
        if (confirm("Are you sure? ")) {
          await api.delete(`/products/${id}`);
          const newData = products.filter((item) => item.id !== id && item);
          setProducts(newData);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          {/* path for client */}
          <Route index element={<Home data={products} />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />

          {/* path for admin */}
          <Route path="/admin" element={<PrivateRoute />}>
            <Route
              path="/admin"
              element={<Dashboard data={products} remove={handleRemove} />}
            />
            <Route
              path="/admin/product-add"
              element={<ProductForm handleProduct={handleProduct} />}
            />
            <Route
              path="/admin/product-edit/:id"
              element={<ProductForm handleProduct={handleProduct} />}
            />
          </Route>

          {/* path empty */}
          <Route path="/register" element={<AuthForm isRegister />} />
          <Route path="/login" element={<AuthForm />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
