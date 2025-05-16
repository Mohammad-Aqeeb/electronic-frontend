import React, { useContext, useEffect } from 'react';
import './Cart.css'; // if you created a separate file
import { CartContext } from '../contex/CartContex';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Cart() {
  const navigate = useNavigate();
  const { cartItems, setCartItems} = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("user"));

  let totalAmount = cartItems.reduce((total , item)=>
    total + item.item_subtotal, 0
  )

  async function updatePlusHandler(id){
    try{
      await api.put(`updateQtyPlus/${id}`);
      getCartItem();
    }
    catch(error){
      console.log(error);
      toast.error("Failed to update quantity")
    }
  }

  async function updateMinusHandler(id){
    try{
      await api.put(`updateQtyMinus/${id}`);
      getCartItem();
    }
    catch(error){
      console.log(error);
      toast.error("Failed to update quantity")
    }
  }

  async function removeItemHandler(id){
    try{
      await api.delete(`/deleteCartItem/${id}`);
      toast.success("Item deleted from cart");
      getCartItem()
    }
    catch(error){
      console.log(error);
      toast.error("Failed to remove");
    }
  }

  function checkOutHandler(){
    cartItems.map(async (item)=>{
      try{
        await api.post("/postMyOrder", item);
        await api.delete(`/deleteCartItem/${item._id}`);
      }
      catch(error){
        console.log(error);
        toast.error(error.message);
      }
    })
    navigate("/MyOrder"); 
    setCartItems([]);
  }

  async function getCartItem(){
    if(user){
      try{
        const res = await api.get(`/getCartData/${user._id}`);
        console.log(res.data.data)
        setCartItems(res.data.data);
      }
      catch(error){
        console.log(error);
      }
    }
  }

  useEffect(()=>{
    getCartItem();
  },[])

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? 
        (
          <p className="empty-cart">Your cart is empty.</p>
        ) : 
        (
          cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.item_image} alt={item.item_name} />
              <div className="cart-item-details">
                <h3>{item.item_name}</h3>
                {
                  item.item_discount ? (
                  <div className="price">
                      <span className="discounted-price">
                          ${(item.item_price * (1 - parseFloat(item.item_discount) / 100)).toFixed(2)}
                      </span>
                      <span className="original-price">${item.item_price.toFixed(2)}</span>
                  </div>
                  ) : (
                  <div className="price">${item.item_price.toFixed(2)}</div>
                  )
                }
                <div className="quantity-container">
                  <div>Quantity: </div>
                  <button onClick={()=>{updateMinusHandler(item._id)}}>-</button>
                  <div className="quantity">{item.item_qty}</div>
                  <button onClick={()=>{updatePlusHandler(item._id)}}>+</button>
                </div>
              </div>
              <button className='cart-item-button' onClick={()=>{removeItemHandler(item._id)}}>Remove</button>
            </div>
          ))
        )
      }

      <div className='checkoutContainer'>
        <div>Total amount : {totalAmount.toFixed(2)}</div>
        <button onClick={checkOutHandler} disabled={cartItems.length === 0}>CheckOut</button>
      </div>
    </div>
  );
}

export default Cart;
