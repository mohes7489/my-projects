import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { productsFetch, modifyProduct } from './productsSlice';

const ModifyProduct = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const products = useSelector(state => state.products.items);
    const [product, setProduct] = useState({});
    const [price, setPrice] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const navigate = useNavigate();

    useEffect(()=> {
        if (!products.length) {
            dispatch(productsFetch());
        } else {
            const foundProduct = products.find(product => product.id === productId);
            setProduct(foundProduct);
        }
    }, [dispatch, productId, products]);

    useEffect(() => {
        if (products && productId) {
            const foundProduct = products.find(product => product.id === productId);
            setProduct(foundProduct || {}); // Set to empty object if not found
        }
    }, [products, productId]);

    const handleCancel = () => {
        navigate(-1); // Go back to previous route
    };

    const handleModifyUserRole = async (productId, price, name, description) => {
        dispatch(modifyProduct({productId, price, name, description}));
        navigate('/products');
    };

    return (
        <div>
            <div data-testid="notifications-container">
                <div data-testid="form-container">
                    <label>Id: </label>
                    <input data-testid="id-value" type="text" defaultValue={productId} readOnly />

                    <label>Name: </label>
                    <input data-testid="name-input" type="text" value={name || product.name || ''} onChange={e=> setName(e.target.value)}/>

                    <label>Price: </label>
                    <input data-testid="price-input" type="text" value={price || product.price || ''} onChange={e => setPrice(e.target.value)}/>

                    <label>Description: </label>
                    <input data-testid="description-input" type="text" value={description || product.description || ''} onChange={e => setDescription(e.target.value)}/>
                    
                    <button data-testid="submit" onClick={() => handleModifyUserRole(product.id, product.price, product.name, product.description)}>Submit</button>
                    <button data-testid="cancel" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};
 
export default ModifyProduct;
