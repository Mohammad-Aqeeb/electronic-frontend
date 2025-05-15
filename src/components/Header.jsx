import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { CartContext } from '../contex/CartContex';

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const {cartItems} = useContext(CartContext)

  const navigate = useNavigate();

  function logoutHandler(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
        {user ? 
          (
            <div>
              <div className='signoutButton' onClick={logoutHandler}>Singout</div>
            </div>
          ) : 
          (
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
