import { useContext, useState } from 'react';
import './Home.css';
import Header from "../components/Header";
import ProductCard from '../components/ProductCard';
import api from '../api';
import toast from 'react-hot-toast';
import { CartContext } from '../contex/CartContex';
import Footer from '../components/Footer';

function Home() {
  const [products, setProducts] = useState([]);
  const {setCartItems} = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("user"));

  async function getData(){
    try{
      let res = await api.get("/itemGet");
      setProducts(res.data.data);
      if(user){
      res = await api.get(`/getCartData/${user._id}`);
      setCartItems(res.data.data);
      }
    }
    catch(error){
      console.log(error);
      toast.error("Failed to fetch items");
    }
  }

  useState(()=>{
    getData();
  },[]);

  return (
    <div>
      <Header />
      <div className="home-container">
        <h1>Welcome to eShop Central</h1>
        <p>Buy top-rated products at great prices!</p>

        <div className="products-grid">
          {
            products.map(item => (
              <ProductCard key={item._id} item={item} />
            ))
          }
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
