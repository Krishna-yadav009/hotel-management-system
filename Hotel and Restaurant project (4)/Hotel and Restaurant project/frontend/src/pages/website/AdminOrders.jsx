import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8080/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch {
      alert("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setLoading(true);

      await axios.put(
        `${API}/orders/${id}/status?status=${status}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchOrders();

    } catch {
      alert("Error updating order");
    } finally {
      setLoading(false);
    }
  };

  const renderActions = (order) => {
    switch (order.status) {
      case "pending":
        return (
          <button onClick={() => updateStatus(order.restaurantOrderId, "accepted")}>
            Accept
          </button>
        );

      case "accepted":
        return (
          <button onClick={() => updateStatus(order.restaurantOrderId, "preparing")}>
            Start Preparing
          </button>
        );

      case "preparing":
        return (
          <button onClick={() => updateStatus(order.restaurantOrderId, "completed")}>
            Mark Completed
          </button>
        );

      case "completed":
        return <span style={{ color: "green", fontWeight: "bold" }}>✔ Done</span>;

      default:
        return null;
    }
  };

  return (
    <div style={{ padding: 20 }}>
        <h1 style={{ color: "red" }}>🔥 ADMIN ORDERS NEW PAGE</h1>
      <h2>Admin Orders</h2>

      {loading && <p>Updating...</p>}

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(o => (
            <tr key={o.restaurantOrderId}>
              <td>{o.restaurantOrderId}</td>
              <td>{o.customerId}</td>
              <td>₹{o.totalCost}</td>

              <td>
                <span style={{
                  color:
                    o.status === "pending" ? "orange" :
                    o.status === "accepted" ? "blue" :
                    o.status === "preparing" ? "purple" :
                    o.status === "completed" ? "green" : "black"
                }}>
                  {o.status}
                </span>
              </td>

              <td>{renderActions(o)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;