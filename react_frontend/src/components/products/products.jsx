/* import { dataTestIds } from "../../tests/constants/components";
import { addToCart } from "../cart/cartSlice";
import { useGetAllProductsQuery } from "../products/productsApi";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const userRole = useSelector(state => state.auth.role);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  } 

  return (
    <div className="homeContainer">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occurred</p>
      ) : (
        <div data-testid={dataTestIds.containerId.main} className="products">
          {data?.map((product) => (
            <div data-testid={dataTestIds.containerId.listItem(product.id)} key={product.id} className="singleProduct">
              <h2 data-testid={dataTestIds.textId.name}>{product.name}</h2>
              <h3 data-testid={dataTestIds.textId.price}>${product.price}</h3>
              <img src={product.image} alt="product image" />
              <p>{product.description}</p>
              {userRole !== 'admin' && (
                <div data-testid={dataTestIds.containerId.notification}>
                <div data-testid={dataTestIds.notificationId.success('cart')}>
                <button data-testid={dataTestIds.clickId.add} className="cartButton"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products; */

import { dataTestIds } from "../../tests/constants/components";
import { addToCart } from "../cart/cartSlice";
import { useGetAllProductsQuery } from "../products/productsApi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { productsFetch } from './productsSlice';

const Products = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const userRole = useSelector(state => state.auth.role);
  const products = useSelector(state => state.products.items);
  const status = useSelector(state => state.products.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(productsFetch());
}, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  } 

  const handleSingleProduct = (productId) => {
    navigate(`/products/${productId}`)
  }

  return (
    <div className="homeContainer">
      {status === "pending" ? (
        <div data-testid="product-loading-notification">
          <p>Loading...</p>
        </div>
      ) : status === "rejected" ? (
        <p>An error occurred</p>
      ) : (
        <div data-testid={dataTestIds.containerId.main} className="products">
          {products && products.map((product) => (
            <div key={product.id} className="singleProductWrapper">
              <div data-testid={dataTestIds.containerId.listItem(product.id)} className="singleProduct">
                <h2 data-testid={dataTestIds.textId.name}>{product.name}</h2>
                <h3 data-testid={dataTestIds.textId.price}>${product.price}</h3>
                <img src={product.image} alt="product image" />
                <p>{product.description}</p>
                {userRole !== 'admin' && (
                  <div data-testid={dataTestIds.containerId.notification}>
                    <div data-testid={dataTestIds.notificationId.success('cart')}>
                      <button data-testid={dataTestIds.clickId.add} className="cartButton" onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                )}
                {userRole === 'admin' && (
                  <div data-testid={dataTestIds.containerId.notification}>
                    <button onClick={()=>handleSingleProduct(product.id)} data-testid="inspect-container">single product</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
