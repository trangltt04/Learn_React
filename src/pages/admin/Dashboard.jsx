import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "./../../contexts/ProductContext";
import api from "../../axios/indext";

const Dashboard = () => {
  const { state, dispatch } = useContext(ProductContext);

  const handleDelete = async (id) => {
    try {
      if (confirm("Are you sure?")) {
        await api.delete(`/products/${id}`);
        dispatch({ type: "DELETE_PRODUCT", payload: id });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const [searchTerm, setSearchTerm] = useState("");

  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  // const filteredData = data.filter((p) =>
  //   p.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  return (
    <div className="dashboard">
      <Link to="/admin/product-add" className="btn btn-outline-danger ">
        Add new product
      </Link>
      {/* <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control"
        />
      </div> */}
      <table className="table table-bordered text-center">
        <thead className="table-danger">
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>THUMBNAIL</th>
            <th>PRICE</th>
            <th>DESCRIPTION</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {/* {data.map((p) => ( */}
          {state.products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>
                {p.thumbnail ? (
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    width={200}
                    height={400}
                  />
                ) : (
                  "Updating"
                )}
              </td>
              <td>{p.price}</td>
              <td>{p.description}</td>
              <td>
                <Link
                  to={`/admin/product-edit/${p.id}`}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
