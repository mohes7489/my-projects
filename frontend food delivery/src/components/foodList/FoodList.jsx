import React from "react";
import "./FoodList.css";
import { food_list } from "../../assets/assets";
import FoodItems from "./FoodItems";

const FoodList = ({ listItem, setListItem }) => {
  return (
    <div>
      <div className="food-item">
        {food_list.map((item) => {
            if(listItem === 'All' || listItem === item.category)
          return (
            <FoodItems
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
              description={item.description}
              category={item.category}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FoodList;
