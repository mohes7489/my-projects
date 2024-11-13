import { createContext, useState } from "react";
import { food_list } from '../assets/assets';

export const StoreContext = createContext(null);

function FoodStoreContext(props) {
    const [quantity, setQuantity] = useState({});

    const handleClick = (id, change) => {
        setQuantity((prev) => ({
          ...prev,
          [id]: Math.max(0, (prev[id] || 0) + change), 
        }));
    }


    const contextValue = {
        food_list,
        handleClick,
        quantity
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
}

export default FoodStoreContext;
