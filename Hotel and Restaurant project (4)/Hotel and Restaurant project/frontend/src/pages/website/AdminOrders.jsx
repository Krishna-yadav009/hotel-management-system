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

      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setLoading(true);

      await axios.patch(
        `${API}/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchOrders();

    } catch (err) {
      console.error(err);
      alert("Error updating order");
    } finally {
      setLoading(false);
    }
  };

  const renderActions = (order) => {
    switch (order.status?.toLowerCase()) {

      case "pending":
        return (
          <button
            onClick={() =>
              updateStatus(order.restaurantOrderId, "preparing")
            }
            style={{
              padding: "6px 12px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Accept
          </button>
        );

      case "preparing":
        return (
          <button
            onClick={() =>
              updateStatus(order.restaurantOrderId, "served")
            }
            style={{
              padding: "6px 12px",
              background: "#7c3aed",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Served
          </button>
        );

      case "served":
        return (
          <button
            onClick={() =>
              updateStatus(order.restaurantOrderId, "completed")
            }
            style={{
              padding: "6px 12px",
              background: "#059669",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Complete
          </button>
        );

      case "completed":
        return (
          <span
            style={{
              color: "limegreen",
              fontWeight: "bold"
            }}
          >
            ✔ Done
          </span>
        );

      case "canceled":
        return (
          <span
            style={{
              color: "red",
              fontWeight: "bold"
            }}
          >
            ✖ Canceled
          </span>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ padding: 20 }}>

      <h2>Admin Orders</h2>

      {loading && <p>Updating...</p>}

     <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px"
  }}
>
  <thead>
    <tr
      style={{
        borderBottom: "1px solid #374151",
        textAlign: "left"
      }}
    >
      <th style={{ padding: "14px" }}>ID</th>
      <th style={{ padding: "14px" }}>Customer</th>
      <th style={{ padding: "14px" }}>Total</th>
      <th style={{ padding: "14px" }}>Status</th>
      <th style={{ padding: "14px" }}>Actions</th>
    </tr>
  </thead>

  <tbody>
    {orders.length > 0 ? (
      orders.map((o) => (
        <tr
          key={o.restaurantOrderId}
          style={{
            borderBottom: "1px solid #1f2937"
          }}
        >
          <td style={{ padding: "14px" }}>
            {o.restaurantOrderId}
          </td>

          <td style={{ padding: "14px" }}>
            {o.customerId}
          </td>

          <td style={{ padding: "14px" }}>
            ₹{o.totalCost}
          </td>

          <td style={{ padding: "14px" }}>
            <span
              style={{
                color:
                  o.status === "pending"
                    ? "orange"
                    : o.status === "preparing"
                    ? "#3b82f6"
                    : o.status === "served"
                    ? "#a855f7"
                    : o.status === "completed"
                    ? "#22c55e"
                    : o.status === "canceled"
                    ? "red"
                    : "white",
                fontWeight: "bold",
                textTransform: "capitalize"
              }}
            >
              {o.status}
            </span>
          </td>

          <td style={{ padding: "14px" }}>
            {renderActions(o)}
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td
          colSpan="5"
          style={{
            textAlign: "center",
            padding: "20px"
          }}
        >
          No Orders Found
        </td>
      </tr>
    )}
  </tbody>
</table>
    </div>
  );
};

export default AdminOrders;