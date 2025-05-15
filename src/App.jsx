import { Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import './App.css';
import CreateProduct from './components/CreateProduct';
import SellerDashboard from './components/sellerDashboard';
import MyOrder from './components/MyOrder';

function App() {
  return (
    <div className='Container'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/MyOrder" element={<MyOrder/>} />
        <Route path="/createProduct" element={<CreateProduct/>} />
        <Route path='/sellerDashboard' element={<SellerDashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;

