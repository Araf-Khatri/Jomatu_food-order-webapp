import { useEffect, useState } from "react";
import { getOrders } from "../firebase/handlers";
import "./OrdersListing.css";

const OrdersListing = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then((data) => setOrders(data));
  }, []);

  const calculateOrderTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.amount, 0);
  };

  return (
    <div className="orders-page-wrapper">
      <div className="orders-page-header">
        <h1 className="orders-page-title">Orders Management</h1>
        <p className="orders-page-subtitle">View and manage customer orders</p>
      </div>

      <div className="orders-page-container">
        {orders.map((order) => (
          <div key={order.id} className="orders-page-card">
            <div className="orders-page-card-header">
              <h2 className="orders-page-order-id">Order #{order.id}</h2>
              <span className={`orders-page-status-badge ${order.status}`}>
                {order.status}
              </span>
            </div>

            <div className="orders-page-user-section">
              <h3 className="orders-page-section-title">Customer Details</h3>
              <div className="orders-page-user-info">
                <p className="orders-page-info-item">
                  <span className="orders-page-label">Name:</span>{" "}
                  {order.user.name}
                </p>
                <p className="orders-page-info-item">
                  <span className="orders-page-label">Address:</span>{" "}
                  {order.user.street}, {order.user.city}
                </p>
                <p className="orders-page-info-item">
                  <span className="orders-page-label">Postal Code:</span>{" "}
                  {order.user.postalCode}
                </p>
              </div>
            </div>

            <div className="orders-page-items-section">
              <h3 className="orders-page-section-title">Ordered Items</h3>
              <table className="orders-page-items-table">
                <thead className="orders-page-table-head">
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody className="orders-page-table-body">
                  {order.orderedItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.amount}</td>
                      <td>₹{item.price}</td>
                      <td className="orders-page-subtotal">
                        ₹{item.price * item.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="orders-page-total">
                <span className="orders-page-total-label">Total Amount:</span>
                <span className="orders-page-total-amount">
                  ₹{calculateOrderTotal(order.orderedItems)}
                </span>
              </div>
            </div>

            {/* <button
              className="orders-page-action-button"
              onClick={() => handleUpdateStatus(order.id)}
            >
              Update Status
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersListing;
