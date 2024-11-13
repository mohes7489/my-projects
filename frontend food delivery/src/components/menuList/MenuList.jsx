import React from "react";
import "./MenuList.css";
import { menu_list } from "../../assets/assets";

const MenuList = ({listItem, setListItem}) => {
  return (
    <div className="list-item">
      {menu_list.map((item) => (
        <div onClick={() => setListItem(listItem==='All'?item.menu_name:'All')} className="item" key={item.menu_name}>
            <img src={item.menu_image} alt="" />
            <h4>{item.menu_name}</h4>
        </div>
      ))}
    </div>
  );
};

export default MenuList;
