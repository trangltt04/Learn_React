import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    if (confirm("Are you sure?")) {
      localStorage.removeItem("user");
      nav("/login");
    }
  };
  return (
    <header>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        {user ? (
          <li>
            <button className="btn btn-danger" onClick={logout}>
              Hello {user?.user?.email} -Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </header>
  );
}
