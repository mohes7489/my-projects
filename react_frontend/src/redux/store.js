/* import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Redux-devtools extension library
import { composeWithDevTools } from "@redux-devtools/extension";

export const reducers = combineReducers({
  // Add reducers here
});

export default legacy_createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
); */



import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
/* import { composeWithDevTools } from '@reduxjs/toolkit';  */
import { setupListeners } from '@reduxjs/toolkit/query/react';
// Import your reducers
import cartReducer from '../components/cart/cartSlice';
import  productsReducer from "../components/products/productsSlice"; 
import { productsApi } from '../components/products/productsApi';
import ordersReducer from '../components/orders/ordersSlice.js';
import orderDetailsReducer from '../components/orders/SingleOrderSlice.js';
import usersReducer from '../components/users/usersSlice.js';
import { ordersApi } from '../components/orders/ordersApi.jsx';
import userDetailsReducer  from '../components/users/SingleUserSlice.js'
import { loginApi } from '../components/login/loginApi';
import { authReducer } from '../auth/authSlice.jsx';
import { LogoutApi } from '../components/Logout/LogoutApi';
import notificationReducer from '../auth/notificationSlice.jsx'
import { usersApi } from '../components/users/usersApi.jsx';
import thunk from 'redux-thunk';
// import { loginsUser } from '../components/login/LoginSlice.js';

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  notifications: notificationReducer,
  orders: ordersReducer,
  /* logins: loginsUser, */ // carful
  orderDetails: orderDetailsReducer,
  userDetails: userDetailsReducer,
  users: usersReducer,
  products: productsReducer, 
  [productsApi.reducerPath]: productsApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [loginApi.reducerPath]: loginApi.reducer,
  [LogoutApi.reducerPath]: LogoutApi.reducer,
  // Other reducers
});

const store = configureStore({
  reducer: rootReducer,
  /* middleware: [thunk], */
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(thunk, loginApi.middleware, productsApi.middleware, LogoutApi.middleware, ordersApi.middleware, usersApi.middleware );
  },
 
  devTools: process.env.NODE_ENV !== 'production',
  // enhancers: [composeWithDevTools()],
});
setupListeners(store.dispatch);

/* store.dispatch(productsFetch()); */

export default store;
 




