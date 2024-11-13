import React, { useState } from 'react'
import './Home.css'
import Header from './header/Header'
import FoodList from '../foodList/FoodList'
import MenuList from '../menuList/MenuList'

const Home = () => {
  const [listItem, setListItem] = useState('All');
  return (
    <div>
        <Header />
        <MenuList listItem = {listItem} setListItem = {setListItem}/>
        <FoodList listItem = {listItem} setListItem = {setListItem}/>
    </div>
  )
}

export default Home