import React, { useContext } from 'react';
import './ProductCard.css';
import { UserContex } from '../contex/userContex';
import axios from 'axios';
import toast from 'react-hot-toast';


function ProductCard({item}) {

  const {user} = useContext(UserContex);

  async function addtoCartHandler(item){
    if(user){
      const obj = {
        user_id : user._id,
        item_id : item._id,
        item_name : item.item_name,
        item_category : item.item_category,
        item_price : item.item_price,
        item_dsc : item.item_dsc,
        item_qty : 1,
        item_image : item.item_image,
        item_discount : item.item_discount
      }
      console.log(obj);
      await axios.post("http://localhost:5000/api/addCart", obj)
      .then(()=>{
        toast.success("item added to cart")
      })
      .catch(()=>{
        toast.error("Item not added");
      })
      
    }
  }

  return (
    <div className="product-card">
      <img src={item.item_image} alt={item.item_name} />

      <div className="product-details">
        <h3>{item.item_name}</h3>
        <p className="category">{item.item_category}</p>
        <p className="description">{item.item_dsc}</p>
        
        {
            item.item_discount ? (
            <p className="price">
                <span className="discounted-price">
                    ${(item.item_price * (1 - parseFloat(item.item_discount) / 100)).toFixed(2)}
                </span>
                <span className="original-price">${item.item_price.toFixed(2)}</span>
                <span className="discount-badge">-{item.item_discount}%</span>
            </p>
            ) : (
            <p className="price">${item.item_price.toFixed(2)}</p>
            )
        }

        <button 
          onClick={()=>{addtoCartHandler(item)}}
          disabled={item.item_qty <= 0}
        >
          {item.item_qty > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
