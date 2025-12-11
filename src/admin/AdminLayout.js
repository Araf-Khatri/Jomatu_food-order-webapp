import { Link, Outlet, useLocation } from "react-router";
import "./AdminLayout.css";

const adminNavigationLinks = [
  { label: "Restaurants", path: "/admin/restaurants" },
  { label: "Orders", path: "/admin/orders" },
];
const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="admin-navbar-wrapper">
      <nav className="admin-navbar-nav">
        <ul className="admin-navbar-list">
          {adminNavigationLinks.map((navLink) => (
            <li className="admin-navbar-item">
              <Link
                className={`admin-navbar-link ${
                  location.pathname.startsWith(navLink.path) ? "active" : ""
                }`}
                to={navLink.path}
              >
                {navLink.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className="admin-navbar-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
