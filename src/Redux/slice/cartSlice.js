import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import toast from 'react-hot-toast';

export const fetchCart = createAsyncThunk('cart/fetch', async () => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if(user){
        const res = await api.get('/getCartData');
        return res.data.data;
    }
    else{
        return [];
    }
});

export const updateQtyPlus = createAsyncThunk("cart/updatePlus", async (id) => {
  const res = await api.put(`updateQtyPlus/${id}`);
  return res.data.result;
});

export const updateQtyMinus = createAsyncThunk("cart/updateMinus", async (id) => {
  const res = await api.put(`updateQtyMinus/${id}`);
  return res.data.result;
});

export const removeCartItem = createAsyncThunk("cart/removeItem", async (id) => {
  await api.delete(`/deleteCartItem/${id}`);
  toast.success("Item removed from cart");
  return id;
});

export const checkOutHandler = createAsyncThunk("cart/checkout", async (_, {getState}) => {
    const state = getState();
    const cartItems = state.cart.items;
    console.log(cartItems);
    try{
      await Promise.all(cartItems.map(async (item)=>{
        const res = await api.get(`/itemGet/${item.item_id}`)
        const sellerId = res.data.data.seller_id;

        const newItem = { ...item, seller_id: sellerId };

        const order = await api.post("/postOrder", newItem);

        await api.post(`/updateOrder/${order.data.data._id}`, {status : "Pending", userType : "User"});

      }));
      toast.success('Order placed successfully'); 
    }
    catch(error){
      console.log(error);
      toast.error("Something went wrong");
    }    
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateQtyPlus.fulfilled, (state, action) => {
      const updatedItem = action.payload;

      state.items = state.items.map(item =>
        item._id === updatedItem._id ? updatedItem : item
      );
     })
     .addCase(updateQtyMinus.fulfilled, (state, action) => {
      const updatedItem = action.payload;

      state.items = state.items.map(item =>
        item._id === updatedItem._id ? updatedItem : item
      );
     })
     
     .addCase(removeCartItem.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
     });
    }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
