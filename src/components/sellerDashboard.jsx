import React, { useEffect, useState } from 'react';
import './SellerDashboard.css';
import api from '../api';

const SellerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  
  async function handleStatusChange(id, orderId, newStatus){
    try {
      await api.put(`/updateOrderStatus/${orderId}`, { order_status: newStatus });
      await api.put(`/updateOrderStatusInSeller/${id}`, { order_status: newStatus });
      // Refresh orders after status change
      const res = await api.get(`seller-orders/${user._id}`);
      const updatedOrders = res.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(updatedOrders);
    } catch (err) {
      console.error("Failed to update order status", err);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get(`seller-orders/${user._id}`);
        const Orders = res.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(Orders);
      } catch (err) {
        console.error('Error fetching orders', err);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, [user._id]);

  return (
    <div className="container">
      <h2 className="seller-header">📦 New Orders</h2>
      {orders.length === 0 ? (
        <p>No new orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card">
            <p className="buyer">👤 Buyer: {order.user_name}</p>
            <p className="order-time">🕒 {new Date(order.createdAt).toLocaleString()}</p>
            <p className="product">📦 {order.item_name}</p>
            <p className="category">🏷️ Category: {order.item_category}</p>
            <p className="price">💰 Price: ${order.item_price}</p>
            <p className="quantity">🔢 Quantity: {order.item_qty}</p>
            <p className="subtotal">🧾 Subtotal: ${(order.item_subtotal).toFixed(2)}</p>
            <img src={order.item_image} alt={order.item_name} className="product-image" />
          <div className="status-control">
          
          <label>Status:</label>
          <select
            value={order.order_status}
            onChange={(e) => handleStatusChange(order._id, order.order_id, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Packed">Packed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
          
        </div>
        ))
      )}
    </div>
  );
};

export default SellerDashboard;
