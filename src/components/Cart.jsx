import React, { useContext, useEffect } from 'react';
import './Cart.css'; // if you created a separate file
import { CartContext } from '../contex/CartContex';
import { UserContex } from '../contex/userContex';
import api from '../api';

function Cart() {
  const { cartItems, setCartItems} = useContext(CartContext);
  const {user} = useContext(UserContex);
  console.log(user);

  let totalAmount = cartItems.reduce((total , item)=>
    total + item.item_price * item.item_qty, 0
  )

  function checkOutHandler(){
    cartItems.map(async (item)=>{
      await api.post("postMyOrder", item);
      console.log(item)
    })
  }

  async function getCartItem(){
    if(user){
      try{
        const res = await api.get(`/getCartData/${user._id}`);
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
                <div className="price">${item.item_price}</div>
                <div className="quantity-container">
                  <div>Quantity: </div>
                  <button>+</button>
                  <div className="quantity">{item.item_qty}</div>
                  <button>-</button>
                </div>
              </div>
              <button className='cart-item-button'>Remove</button>
            </div>
          ))
        )
      }

      <div className='checkoutContainer'>
        <div>Total amount : {totalAmount.toFixed(2)}</div>
        <button onClick={checkOutHandler}>CheckOut</button>
      </div>
    </div>
  );
}

export default Cart;
