import { dataTestIds } from "../../tests/constants/components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllOrdersQuery } from "./ordersApi";
import { ordersFetch } from "./ordersSlice";
import { Link } from 'react-router-dom';
const Orders = () => {
    const { data, error, isLoading } = useGetAllOrdersQuery();
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.items);
    const status = useSelector(state => state.orders.status);
    console.log("status is: ",status);
    useEffect(() => {
      dispatch(ordersFetch());
  }, [dispatch]);

  const handleSingleOrder = (id) => {
    return (
      <Link to={`/orders/${id}`} >
        {id}
      </Link>
    );
  };

  return (
    <div data-testid="notifications-container" className="homeContainer">
      {status === "pending" ? (
        <p data-testid="order-loading-notification">Loading...</p>
      ) : status === "success" ? (
      <div data-testid="order-success-notification">
        <div data-testid={dataTestIds.containerId.main} className="orders">
          {orders && orders.length === 0 ? (
            <div data-testid="empty-container">
              <h3 data-testid="notifications-container">You have no orders</h3>
            </div>
          ) : orders?.map((order) => (
              <div data-testid={dataTestIds.containerId.listItem(order.id)} key={order.id} className="singleOrder">
                <h2 data-testid={dataTestIds.textId.name}>{order.customerId}</h2>
                <div data-testid="id-value">
                  <div data-testid="inspect-container">
                    <span data-testid={dataTestIds.linkId.inspect(order.id)}>{handleSingleOrder(order.id)}</span>
                  </div>
                </div>
                <ul>
                  {order.items.map((item) => (
                    <li key={item.product.id}>
                      <span>{item.product.id}</span><br />
                      <span>{item.product.name}</span><br />
                      <span>{item.product.price}</span><br />
                      <span>{item.product.description}</span><br />
                      <span>{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>An error occurred</p>
      )}
    </div>
  );
}
 
export default Orders;