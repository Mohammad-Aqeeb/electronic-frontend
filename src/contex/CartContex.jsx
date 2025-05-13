import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  

  // function addToCart(product){
  //   setCartItems(prevItems => {
  //     const exists = prevItems.find(item => item._id === product._id);
  //     if (exists) {
  //       return prevItems.map(item =>
  //         item._id === product._id ? { ...item, item_qty: item.item_qty + 1 } : item
  //       );
  //     }
  //     return [...prevItems, { ...product, item_qty: 1 }];
  //   });
  // };

  // function removeFromCart(id){
  //   console.log(id);
  //   setCartItems(prevItems => prevItems.filter(item => item._id !== id));
  // };



  // function minusQuantity(product){
  //   console.log(product)
  //   setCartItems(prevItems => {
  //     if(product.item_qty === 1 ){
  //       removeFromCart(product._id)
  //     }
      
  //     return prevItems.map(item =>
  //       item._id === product._id ? { ...item, item_qty: item.item_qty - 1 } : item
  //     );

  //   });
  // };


  return (
    <CartContext.Provider value={{ cartItems, setCartItems}}>
      {children}
    </CartContext.Provider>
  );
};
