import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ data, remove }) => {
  // console.log(data);

  // const remove = (id) => {
  //   console.log(id);
  // };
  return (
    <div>
      <Link to="/admin/product-add" className="btn btn-outline-danger">
        Them san pham
      </Link>
      <table className="table table-bordered text-center">
        <thead className="table-dark">
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
          {data.map((p) => (
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
                <button className="btn btn-danger" onClick={() => remove(p.id)}>
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
