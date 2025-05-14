import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { UserContex } from '../contex/userContex';

function Header() {
  const {user, setUser} = useContext(UserContex);

  function logoutHandler(){
    localStorage.removeItem("token");
    setUser(null);
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
              <Link onClick={logoutHandler}>Singout</Link>
            </div>
          ) : 
          (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )
        }
        
        <Link to="/cart">🛒</Link>
      </div>
    </header>
  );
}

export default Header;
