import { NavLink, Outlet } from 'react-router-dom';
import './SellerDashboard.css';

const SellerDashboard = () => {
  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h2>Dashboard</h2>
        <ul>
          <li>
            <NavLink to="myProducts">My Products</NavLink>
          </li>
          <li>
            <NavLink to="newOrder">New Orders</NavLink>
          </li>
          <li>
            <NavLink to="createProduct" >Add new Product</NavLink>
          </li>
        </ul>
      </nav>

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default SellerDashboard;
