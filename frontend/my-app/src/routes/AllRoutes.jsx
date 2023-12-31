import React from 'react'
import {Route, Routes} from "react-router-dom"

import Dashboard from '../pages/Dashboard'
import AddBook from '../pages/AddBook'
import Cart from '../pages/Cart'
import CheckOut from '../pages/CheckOut'



const AllRoutes = () => {
  return (
   <>
   <Routes>
    
     <Route path='/addbook' element={<AddBook/>}></Route>
     
     <Route path='/' element={<Dashboard/>}></Route>

     <Route path='/cart' element={<Cart/>}></Route>

     <Route path='/checkout' element={<CheckOut/>}></Route>



   </Routes>
   </>
  )
}

export default AllRoutes