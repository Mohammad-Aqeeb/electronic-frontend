import React, { useContext, useState } from 'react';
import './Home.css';
import Header from "../components/Header";
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import api from '../api';
import { UserContex } from '../contex/userContex';

// { id: 1, name: "Wireless Headphones", price: 59.99, image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6296/6296111_rd.jpg"},
// { id: 2, name: "Smart Watch", price: 89.99, image: "" },
// { id: 3, name: "Bluetooth Speaker", price: 39.99, image: "https://static3.srcdn.com/wordpress/wp-content/uploads/2020/10/81g26BxrTAL.-AC-SL1500-.jpg"},
// { id: 4, name: "Gaming Mouse", price: 29.99, image: "https://th.bing.com/th/id/OPAC.PhfxGyB7R28LmA474C474?w=592&h=550&o=5&dpr=1.3&pid=21.1" },

function Home() {
  const [products, setProducts] = useState([]);
  const {setUser} = useContext(UserContex)

  async function getData(){
    const res = await api.get("itemGet");
    setProducts(res.data.data);
  }

  useState(()=>{
    const token = localStorage.getItem('token');
    if (token) {
      // user data fetch karo
      api.get('/getUserProfile') // example endpoint
        .then(res => {
          setUser(res.data.user); // ya jaisa aap backend se bhej rahe ho
        })
        .catch(err => {
          console.error(err);
        });
    }
    getData();
  },[])

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
    </div>
  );
}

export default Home;
