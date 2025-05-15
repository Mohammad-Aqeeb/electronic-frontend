import React, { useEffect, useState } from 'react';
import './SellerDashboard.css';
import api from '../api';

const SellerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

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
      <h2 className="header">📦 New Orders</h2>
      {orders.length === 0 ? (
        <p>No new orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card">
            <p className="buyer">👤 Buyer: {order.user_name}</p>
            <p className="order-time">🕒 {new Date(order.createdAt).toLocaleString()}</p>
            <p className="product">📦 {order.item_name}</p>
            <p className="category">🏷️ Category: {order.item_category}</p>
            <p className="price">💰 Price: ₹{order.item_price}</p>
            <p className="quantity">🔢 Quantity: {order.item_qty}</p>
            <p className="subtotal">🧾 Subtotal: ₹{order.item_subtotal}</p>
            <img src={order.item_image} alt={order.item_name} className="product-image" />
          </div>
        ))
      )}
    </div>
  );
};

export default SellerDashboard;
