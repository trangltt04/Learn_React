import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/admin/Dashboard";
import { useEffect, useState } from "react";
import api, { getProducts } from "./axios/indext";
import ProductAdd from "./pages/admin/ProductAdd";
import Footer from "./components/footer";
import Header from "./components/header";
import ProductEdit from "./pages/admin/ProductEdit";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await api.get("products");
      setProducts(data);
    })();
  }, []);

  const handleSubmit = (data) => {
    //console.log(data);
    (async () => {
      try {
        const res = await api.post("/products", data);
        setProducts([...products, res.data]);
        if (confirm("Add succefully, redirect to admin page?")) {
          navigate("/admin");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const handleSubmitEdit = (data) => {
    (async () => {
      try {
        await api.patch(`/products/${data.id}`, data);
        const newData = await getProducts();
        // setProducts(products.map((p) => (p.id === data.id ? data : p)));
        setProducts(newData);
        if (confirm("Edit product successfully, redirect to admin page!")) {
          navigate("/admin");
        }
      } catch (error) {
        console.log(error);
      }
    })();
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
          <Route path="/" element={<Home data={products} />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/admin"
            element={<Dashboard data={products} remove={handleRemove} />}
          />
          <Route
            path="/admin/product-add"
            element={<ProductAdd onAdd={handleSubmit} />}
          />
          <Route
            path="/admin/product-edit/:id"
            element={<ProductEdit onEdit={handleSubmitEdit} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
