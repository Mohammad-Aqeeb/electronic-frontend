// src/pages/TrackOrderPage.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import './TrackMyOrder.css';

const orderSteps = [
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled"
];

function TrackMyOrder(){
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await api.get(`/order/track/${id}`);
        setOrder(res.data.data);
      } catch (err) {
        setError('Order not found or server error');
      }
    }
    fetchOrder();
  }, [id]);

  if (error) return <div className="track-container"><h2>{error}</h2></div>;
  if (!order) return <div className="track-container"><h2>Loading...</h2></div>;

  const currentStepIndex = orderSteps.indexOf(order.order_status);

  return (
    <div className="track-container">
      <h2>📦 Tracking Order</h2>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Last Updated:</strong> {new Date(order.updatedAt).toLocaleString()}</p>

      <div className="timeline">
        {orderSteps.map((step, index) => {
          const statusClass = 
            index < currentStepIndex ? 'done' : 
            index === currentStepIndex ? 'current' : 'upcoming';

          return (
            <div key={step} className={`step ${statusClass}`}>
              <div className="dot"></div>
              <div className="label">{step}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackMyOrder;
