import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { CartContext } from '../contex/CartContex';
import { BiSolidUser } from "react-icons/bi";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const {cartItems, setCartItems} = useContext(CartContext)

  const navigate = useNavigate();

  function logoutHandler(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCartItems([]);
    navigate("/login");
  }

  return (
    <header className="header">
      <div className="left">
        <Link to="/" className="logo">ClassicShop</Link>
      </div>

      <div className="center">
        <input type="text" placeholder="Search for items..." />
        <button>🔍</button>
      </div>

      <div className="right">
        {
         user ? 
          (
          <div className="user-menu">
            <div className="user-name">
              <BiSolidUser className="user-icon" />
              {user.name || "Account"}
            </div>
            <div className="dropdown-menu">
              <div onClick={() => navigate('/')}>👤 Profile</div>
              <div onClick={() => navigate('/MyOrder')}>📦 My Orders</div>
              <div onClick={logoutHandler}>🚪 Sign Out</div>
            </div>
          </div>
          ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
          )
        }
        <div className='cartContainer'>
          <Link to="/cart">🛒</Link>
          <div className='cartLength'>{cartItems.length}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
