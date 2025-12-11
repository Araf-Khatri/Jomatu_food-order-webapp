import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import AdminLayout from "./admin/AdminLayout";
import AdminLoginForm from "./admin/AdminLoginForm";
import OrdersListing from "./admin/OrdersListing";
import Restaurant from "./admin/Restaurant";
import Restaurants from "./admin/Restaurants";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

const cookies = new Cookies(null, { path: "/" });

const { REACT_APP_ADMIN_PASSWORD } = process.env;
function App() {
  const navigate = useNavigate();
  const [cartIsShown, setCartIsShown] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const confirmPasswordHandler = (password) => {
    if (REACT_APP_ADMIN_PASSWORD === password) {
      setIsAdminLoggedIn(true);
      cookies.set("adminToken", true, {
        path: "/",
        expires: new Date(new Date().getTime() + 10 * 60 * 1000), // 10mins
      });
      navigate("/admin/restaurants");
    }
  };

  useEffect(() => {
    const adminToken = cookies.get("adminToken");
    if (adminToken) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <CartProvider>
            {cartIsShown && <Cart onClose={hideCartHandler} />}
            <Header onShowCart={showCartHandler} />
            <main>
              <Meals />
            </main>
          </CartProvider>
        }
      />

      {isAdminLoggedIn ? (
        <Route path="admin" element={<AdminLayout />}>
          <Route path="restaurants" element={<Restaurants />} />
          <Route path="restaurants/:restaurantId" element={<Restaurant />} />

          <Route path="orders" element={<OrdersListing />} />

          <Route index element={<Navigate to="/admin/restaurants" />} />
          <Route
            path="*"
            element={<Navigate to="/admin/restaurants" replace />}
          />
        </Route>
      ) : (
        <>
          <Route
            path="/admin"
            element={
              <AdminLoginForm confirmPasswordHandler={confirmPasswordHandler} />
            }
          />
          <Route path="*" element={<Navigate to="/admin" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
