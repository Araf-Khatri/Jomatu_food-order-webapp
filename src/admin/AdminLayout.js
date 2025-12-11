import { Link, Outlet } from "react-router";
import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-navbar-wrapper">
      <nav className="admin-navbar-nav">
        <ul className="admin-navbar-list">
          <li className="admin-navbar-item">
            <Link className="admin-navbar-link" to="/admin/restaurants">
              Restaurants
            </Link>
          </li>
          <li className="admin-navbar-item">
            <Link className="admin-navbar-link" to="/admin/orders">
              Orders
            </Link>
          </li>
        </ul>
      </nav>
      <main className="admin-navbar-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
