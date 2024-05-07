import { dataTestIds } from "../../tests/constants/components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, addToCart, decreaseCart, clearCart, getTotalAmount  } from "./cartSlice";
import axios from "axios";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    console.log("the cart", cart);
    const role = useSelector((state) => state.auth.role);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartTotalQuantity = useSelector(state => state.cart.cartTotalQuantity);

    useEffect(()=> {
        dispatch(getTotalAmount());
    },[cart])
    const handleRemove = (cartItem) => {
        dispatch(removeFromCart(cartItem))
    }

    const handleIcrement = (cartItem) => {
        dispatch(addToCart(cartItem));
    }

    const handleDecrement = (cartItem) => {
        dispatch(decreaseCart(cartItem));
    }

    const handleClearCart = ()=> {
        dispatch(clearCart());
    }

    const  handleOrder = async (cart) => {
        if(role === 'guest') {
            navigate('/login');
        } else {
            navigate('/orders');
        }
        
        try {
            const orderItems = cart.cartItems.map(item => ({
                "product": {
                    "id": item.id,
                    "name": item.name,
                    "price": item.price,
                    "description": item.description
                },
                "quantity": item.cartQuantity
            }));

            const requestBody = {
                "items": orderItems
            };

            const response = await axios.post('http://localhost:3001/api/orders', requestBody , {
                withCredentials: true,
            });
            console.log('Order placed:', response.data);
            dispatch(clearCart());
            navigate('/');
        } catch (error) {
            console.error('Failed to place order:', error);

        }
    }
    return (
        <div data-testid={dataTestIds.containerId.main} className="cartContainer">
            <h2>Shopping Cart</h2>
            {cart.cartItems.length === 0 ? (
                <div data-testid="empty-container">
                    <h3 data-testid="notifications-container">Your cart is currently empty</h3>
                    <div>
                        <Link to="/products">
                            <span>Start Shoping</span>
                        </Link>
                    </div>
                </div>): (
                <div data-testid={dataTestIds.containerId.main}>
                    <div className="cartTitle">
                        <h3 className="productName">PRODUCT</h3>
                        <h3 className="price">PRICE</h3>
                        <h3 className="quantity">QUANTITY</h3>
                        <h3 className="total">TOTAL</h3>
                    </div>
                    <div data-testid="notifications-container" className="cartBody">
                        {cart.cartItems?.map(cartItem => (
                            <div data-testid={dataTestIds.containerId.main} className="cartItem" key={cartItem.id}>
                                <div>
                                    <img src={cartItem.image} alt={cartItem.name} />
                                    <div data-testid="notifications-container">
                                        <h3 data-testid={dataTestIds.textId.name}>{cartItem.name}</h3>
                                        <p>{cartItem.description}</p>
                                        <button className="removeItem" onClick={()=> handleRemove(cartItem)}>
                                            <div data-testid="cart-success-notification"> {/* just added */}
                                                Remove
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                    
                                        <div data-testid={dataTestIds.textId.price} className="cartItemPrice">${cartItem.price}</div>

                                        <div data-testid={dataTestIds.containerId.listItem(cartItem.id)} className="cartItemQuantity">
                                            <div data-testid="notifications-container">
                                                <button data-testid="reduce" onClick={()=> handleDecrement(cartItem)}>-</button>
                                                <div data-testid={dataTestIds.textId.quantity} className="count">{cartItem.cartQuantity}</div>
                                                
                                                <button data-testid="add" onClick={() => handleIcrement(cartItem)}>
                                                <div data-testid="cart-success-notification">
                                                    +
                                                </div>
                                                </button>
                                                
                                            </div>
                                        </div>
                                    
                                <div>${cartItem.price * cartItem.cartQuantity}</div>
                            </div>
                        ))}
                    </div>
                    <div className="cartSummary">
                        <div data-testid="cart-success-notification">
                            <button className="clearCart" onClick={()=> {handleClearCart()}}>Clear Cart</button>
                            <button data-testid={dataTestIds.clickId.submit} className="checkout" onClick={()=> {handleOrder(cart)}}>Check out</button>
                        </div>
                    </div>
                </div>)}
        </div>
    );
}
 
export default Cart;