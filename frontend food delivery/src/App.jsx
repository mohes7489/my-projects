import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes ,Route } from 'react-router-dom'
import Home from './components/home/Home'
import Signin from './components/signin/Signin'
import Footer from './components/footer/Footer'

const App = () => {
  const [showSignin, setShowSignin] = useState(false);
  return (
    <div>
      {showSignin && <Signin showSignin = {showSignin} setShowSignin = {setShowSignin}/>}
      <Navbar setShowSignin = {setShowSignin}/>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App