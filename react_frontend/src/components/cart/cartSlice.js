import { createSlice } from '@reduxjs/toolkit';
import { toast } from "react-toastify";
const initialState = {
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      if(itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1};
        state.cartItems.push(tempProduct);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      // toast.success("Item added to the cart", {position: "bottom-left"});
    },
    removeFromCart(state, action) {
      const newCartItem = state.cartItems.filter(item => item.id !== action.payload.id);
      state.cartItems = newCartItem;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      // toast.error("Item removed from the cart", {position: "bottom-left"});
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      if(state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if(state.cartItems[itemIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(item => item.id !== action.payload.id);
        state.cartItems = newCartItem;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state, action) {
      state.cartItems = []
      // toast.error("Cart is empty", {position: "bottom-left"});
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    // Other reducer functions
    getTotalAmount(state, action) {
      let {total, quantity} = state.cartItems.reduce((cartTotal, cartItem)=> {
        const {price, cartQuantity} = cartItem;
        const itemTotal = price * cartQuantity;
        cartTotal.total += itemTotal;
        cartTotal.quantity += cartQuantity;
        return cartTotal;
      }, {
        total: 0,
        quantity: 0
      });
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});



export const myCarts = state => state.Cart;

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotalAmount } = cartSlice.actions;

export default cartSlice.reducer;