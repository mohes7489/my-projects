import { dataTestIds } from "./tests/constants/components.js";
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/NavBar.jsx';
import HomePage from "./components/Home page/HomePage.jsx";
import Cart from "./components/cart/cart.jsx";
import './App.css';
import Login from "./components/login/Login.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Logout from "./components/Logout/Logout.jsx";
import Products from "./components/products/products.jsx";
import Orders from "./components/orders/orders.jsx";
import Users from "./components/users/users.jsx";
import { useSelector } from "react-redux";
import NotFound from "./components/NotFound.jsx";
import SingleOrderDetails from "./components/orders/SingleOrderDetails .jsx";
import Register from "./components/register/register.jsx";
import SingleUserDetails from "./components/users/SingleUserDetails.jsx";
import ModifyUserRole from "./components/users/modifyUserRole.jsx";
import SingleProduct from "./components/products/SingleProduct.jsx";
import ModifyProduct from "./components/products/ModifyProduct.jsx";

const App = () => {
  const role = useSelector((state) => state.auth.role);

  return (
    <div data-testid={dataTestIds.containerId.app}>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
        {role === 'guest' && <Route path="/register" element={<Register />} />} 
        {role !== 'guest' && <Route path="/orders" element={ <Orders />} />}
        {role !== 'guest' && <Route path="/orders/:orderId" element={<SingleOrderDetails />} />}
        {role === 'guest' && <Route path="/login" element={ <Login />}>  </Route> }
        {role !== 'admin' && <Route path="/cart" element={<Cart />} />}
        {role === 'admin' && <Route path="/products/:productId/modify" element={<ModifyProduct />} />}
        {role === 'admin' && <Route path="/users" element={<Users />} />}
        {role === 'admin' && <Route path="/users/:userId" element={<SingleUserDetails />} />}
        {role === 'admin' && <Route path="/users/:userId/modify" element={<ModifyUserRole />} />}
        <Route path="*" element={<NotFound />}/>
      </Routes>
      <footer>
        <p>Copyright &copy; 2024</p>
      </footer>
    </div>
  );
};

export default App;