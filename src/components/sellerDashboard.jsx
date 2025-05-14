import React, { useContext, useEffect, useState } from 'react';
import './SellerDashboard.css';
import api from '../api';
import { UserContex } from '../contex/userContex';

const SellerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const user = localStorage.getItem("user");
  console.log(user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get(`seller-orders/${user._id}`);
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders', err);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h2 className="header">📦 New Orders</h2>
      {orders.length === 0 ? (
        <p>No new orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="card">
            <p className="buyer">👤 Buyer: {order.buyer_name}</p>
            <p className="order-time">🕒 {new Date(order.timestamp).toLocaleString()}</p>
            <ul>
              {order.items.map((item, i) => (
                <li key={i} className="item">
                  {item.product_name} - Qty: {item.item_qty} - ₹{item.item_price}
                </li>
              ))}
            </ul>
            <p className="total">
              💰 Total: ₹{order.items.reduce((t, i) => t + i.item_price * i.item_qty, 0)}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default SellerDashboard;
