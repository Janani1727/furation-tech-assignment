import React from 'react'
import {Route, Routes} from "react-router-dom"

import Dashboard from '../pages/Dashboard'
import AddBook from '../pages/AddBook'
import Cart from '../pages/Cart'



const AllRoutes = () => {
  return (
   <>
   <Routes>
    
     <Route path='/addbook' element={<AddBook/>}></Route>
     
     <Route path='/dashboard' element={<Dashboard/>}></Route>

     <Route path='/cart' element={<Cart/>}></Route>



   </Routes>
   </>
  )
}

export default AllRoutes