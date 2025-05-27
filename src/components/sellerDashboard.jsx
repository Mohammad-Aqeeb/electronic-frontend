// import React, { useEffect, useState } from 'react';
// import './SellerDashboard.css';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSellerOrders } from '../Redux/slice/sellerDashboardSlice';

// const SellerDashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const {orders} = useSelector(state => state.sellerDashboard);

//   const fetchOrders = async () => {
//     try {
//       await dispatch(fetchSellerOrders()).unwrap();
//     } catch (err) {
//       console.error('Error fetching orders', err);
//       toast.error("Failed to fetch seller orders");
//     }
//   };

//   useEffect(() => {
//       fetchOrders();
//       const interval = setInterval(fetchOrders, 10000); // refresh every 10 sec
//       return () => clearInterval(interval);
//     }, []);

//   return (
//     <div className="orders-container">
//       <h2> 📦 New Orders</h2>
//       {orders.length === 0 ? (
//         <p>No orders yet</p>
//       ) : (
//         <div className="order-list-header">
//           <span>Product</span>
//           <span>Price</span>
//           <span>Date</span>
//           <span>Action</span>
//         </div>
//       )}

//       {orders.map(order => (
//         <div key={order._id} className="order-row">
//           <div>🏷️{order.item_name}</div>
//           <div>{order.item_price}</div>
//           <div>{new Date(order.createdAt).toLocaleString()}</div>
//           <div>
//             <button
//               className="cancel-btn"
//               onClick={() => navigate(`/TrackSellerOrder/${order._id}`)}
//             >
//               View Details
//             </button>
//           </div>
//         </div>  
//       ))}
//     </div>
//   );
// };

// export default SellerDashboard;


import { useEffect } from 'react';
import './SellerDashboard.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerOrders, fetchSellerProducts } from '../Redux/slice/sellerDashboardSlice';
import ProductCard from './ProductCard';

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, products} = useSelector(state => state.sellerDashboard);

  const fetchAllData = async () => {
    try {
      await dispatch(fetchSellerOrders()).unwrap();
      await dispatch(fetchSellerProducts()).unwrap();
    } catch (err) {
      toast.error("Error fetching dashboard data");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="orders-container">
      <h2>📦 New Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="order-list-header">
          <span>Product</span>
          <span>Price</span>
          <span>Date</span>
          <span>Action</span>
        </div>
      )}
      {orders.map(order => (
        <div key={order._id} className="order-row">
          <div>🏷️ {order.item_name}</div>
          <div>{order.item_price}</div>
          <div>{new Date(order.createdAt).toLocaleString()}</div>
          <div>
            <button
              className="cancel-btn"
              onClick={() => navigate(`/TrackSellerOrder/${order._id}`)}
            >
              View Details
            </button>
          </div>
        </div>
      ))}

      <h2>🛍️ Your Products</h2>
      {products.length === 0 ? (
        <p>No products listed yet.</p>
      ) : (
        
          <div className="products-grid">
            {
              products.map(item => (
                <ProductCard  key={item._id} item={item} />
              ))
            }
          </div>

      )}
    </div>
  );
};

export default SellerDashboard;
