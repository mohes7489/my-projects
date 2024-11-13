import React, { useContext } from "react";
import { StoreContext } from "../StoreContext";

const FoodItems = ({id ,name, image, price, description, category}) => {
    const {handleClick, quantity} = useContext(StoreContext);

  return (
    <div>
        <div className="single" key={id}>
            <h3>{name}</h3>
            <img src={image} alt={name} />
            <h4>{price} $</h4>
            <p>{description}</p>
            <small>{category}</small>
            <div className="buttons">
              <button className="minus" onClick={() => handleClick(id, -1)}>
                -
              </button>
              <p>{quantity[id] || 0}</p>
              <button className="plus" onClick={() => handleClick(id, 1)}>
                +
              </button>
            </div>
          </div>
    </div>
  )
}

export default FoodItems