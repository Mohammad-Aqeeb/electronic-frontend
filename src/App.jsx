import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './components/Cart';
import MyOrder from './components/MyOrder';
import CreateProduct from './components/CreateProduct';
import SellerDashboard from './components/sellerDashboard';
import TrackMyOrder from './components/TrackMyOrder'
import TrackSellerOrder from './components/TrackSellerOrder';
import AdminDashboard from './components/AdminDashboard';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <div className='Container'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/MyOrder" element={<MyOrder/>} />
        <Route path="/trackOrder/:id" element={<TrackMyOrder />} />
        <Route path="/createProduct" element={<CreateProduct/>} />
        <Route path='/sellerDashboard' element={<SellerDashboard/>} />
        <Route path="/TrackSellerOrder/:id" element={<TrackSellerOrder/>} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </div>
  );
}

export default App;

