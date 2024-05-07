/* import { dataTestIds } from "../../tests/constants/components";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SingleOrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/orders/${orderId}`, {withCredentials: true,});
                setOrder(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        }

        fetchOrderDetails();
    }, [orderId]);

    return (
        <div data-testid="notifications-container">
            {order === null ? (<p data-testid="order-loading-notification">Loading...</p>) : (
                <div data-testid="order-success-notification">
                <div data-testid="inspect-container">
                    <div data-testid={dataTestIds.containerId.listItem(order.id)}>{order.items.length}</div>
                    <h2>{order.id}</h2>
                    <h3>customer Id is: {order.customerId}</h3>
                    
                </div>
                
            </div>
        )}
        </div>
    );
    
        
}

export default SingleOrderDetails; */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOrderDetails, selectOrderDetails, selectOrderLoading, selectOrderError } from './SingleOrderSlice';
import { dataTestIds } from "../../tests/constants/components";

const SingleOrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const order = useSelector(selectOrderDetails);
  const loading = useSelector(selectOrderLoading);
  const error = useSelector(selectOrderError);
  const [totalQuantity, setTotalQuantity] = useState(0);
  console.log(order)

  useEffect(() => {
    dispatch(fetchOrderDetails(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (order) {
      let count = 0;
      order.items.forEach(item => {
        count += item.quantity;
      });
      setTotalQuantity(count);
    }
  }, [order]);

  return (
    <div data-testid="notifications-container">
      {loading ? (
        <p data-testid="order-loading-notification">Loading...</p>
      ) : error ? (
        <p data-testid="order-error-notification">Error: {error.message}</p>
      ) : order ? (
        <div data-testid="order-success-notification">
          <div data-testid="inspect-container">
            
              <h2>Order ID: {order.id}</h2>
              <h3>Customer ID: {order.customerId}</h3>
              <p>Total Quantity: {totalQuantity}</p>
              <ul>
                {order.items.map((item, index) => (
                <div data-testid={dataTestIds.containerId.listItem(order.id)}>
                  <li key={index}>
                    <p data-testid="id-value">Product ID: {item.product.id}</p>
                    <p data-testid="name-value">Product Name: {item.product.name}</p>
                    <p data-testid="quantity-value">Quantity: {item.quantity}</p>
                  </li>
                </div>
                ))}
              </ul>
            
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SingleOrderDetails;
