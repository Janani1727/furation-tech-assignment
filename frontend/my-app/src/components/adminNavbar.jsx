import React from 'react'
import {Box} from "@chakra-ui/react"
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <>
    <Box  width={"100%"} backgroundColor={"blue.500"} color={"white"} height={"50px"} display={"flex"}  justifyContent={"space-evenly"} fontSize={"22px"}>
      
        
        <Link to={"/addbook"}>
        <h1>AddBook</h1>
        </Link>

  
        <Link to={"/dashboard"}>
        <h1>Dashboard</h1>
        </Link>

          
        <Link to={"/cart"}>
        <h1>Cart</h1>
        </Link>


       
    </Box>
    </>
  )
}

export default AdminNavbar