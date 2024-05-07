import { dataTestIds } from "../../tests/constants/components.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { logOut } from '../../auth/authSlice.jsx';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const userRole = useSelector(state => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth);
  const handleLogOut = ()=> {
    try {
      // console.log(userData);
      dispatch(logOut(userData));
      navigate('/logout');
    return;
    } catch (error) {
      console.log("the error: ", error);
    } 
   

  }
  const renderLinks = () => {
    let number = 0;
    switch (userRole) {
      case 'customer':
        return (
          <div>
            <Link to="/" data-testid={dataTestIds.linkId.home}>Home</Link>
            <Link to="/products" data-testid={dataTestIds.linkId.products}>Products</Link>
            <Link to="/orders" data-testid={dataTestIds.linkId.orders}>Orders</Link>
            <Link to="/logout" data-testid="logout" onClick={handleLogOut}>Logout</Link>
            <Link to="/cart" data-testid={dataTestIds.linkId.cart}>Cart</Link>
          </div>
        );
      case 'admin':
        return (
          <div>
            <Link to="/" data-testid={dataTestIds.linkId.home}>Home</Link>
            <Link to="/products" data-testid={dataTestIds.linkId.products}>Products</Link>
            <Link to="/orders" data-testid="orders-link">Orders</Link>
            <Link to="/users" data-testid={dataTestIds.linkId.users}>Users</Link>
            <Link to="/logout" data-testid="logout" onClick={handleLogOut}>Logout</Link>
          </div>
        );
      default:
        return (
          <div>
            <Link to="/" data-testid={dataTestIds.linkId.home}>Home</Link>
            <Link to="/login" data-testid="login-link">Login</Link>
            <Link to="/register" data-testid={dataTestIds.linkId.register}>Register</Link>
            <Link to="/products" data-testid={dataTestIds.linkId.products}>Products</Link>
            <Link to="/cart" data-testid={dataTestIds.linkId.cart} className='cartNumber'>Cart {number}</Link>
          </div>
        );
    }
  };
  

  return (
    <div data-testid={dataTestIds.containerId.navbar}>
      <div className='NavBar'>
        {renderLinks()}
      </div>
      <div data-testid={dataTestIds.containerId.profile}>
        <p data-testid={dataTestIds.textId.role} className='userRoleParagraph'>{userRole || 'Guest'}</p>
      </div>
    </div>
  );
};
export default Navbar;
