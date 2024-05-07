import { dataTestIds } from "../../tests/constants/components";
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { productsFetch, deleteProduct } from './productsSlice';

const SingleProduct = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector(state => state.products.items);
    const userRole = useSelector(state => state.auth.role);
    const [product, setProduct] = useState(null);

    useEffect(()=> {
        if (!products.length) {
            dispatch(productsFetch());
        } else {
            const foundProduct = products.find(product => product.id === productId);
            setProduct(foundProduct);
        }
    }, [dispatch, productId, products]);

    if (!product) {
        return <p>Loading...</p>;
    }

    const handleSingleProduct = (productId) => {
        navigate(`/products/${productId}/modify`)
      }

    const handleDeleteProduct = (productId) => {
        dispatch(deleteProduct(productId));
        navigate(-1);
    }

    return (
        <div>
            <h2 data-testid={dataTestIds.textId.name}>{product.name}</h2>
            <h3 data-testid={dataTestIds.textId.price}>${product.price}</h3>
            <img src={product.image} alt="product image" />
            <p>{product.description}</p>
            {userRole === "admin" && (
                <div data-testid={dataTestIds.containerId.notification}>
                    <button onClick={()=> handleDeleteProduct(product.id)} data-testid="delete">delete</button>
                    <button onClick={()=>handleSingleProduct(product.id)} data-testid="modify">single product</button>
                </div>
            )}
        </div>
    );
}

export default SingleProduct;

