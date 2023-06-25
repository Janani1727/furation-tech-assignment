import React from 'react'

import {
    postMovies,
  
  } from "../redux/action";
  import { useDispatch } from "react-redux";
  import { useState} from "react";
  import { Button, Input, Text } from "@chakra-ui/react";
  import { useToast } from "@chakra-ui/react";
  import AdminNavbar from "../components/adminNavbar";

const AddBook = () => {

    const dispatch = useDispatch();
    const toast = useToast();
  // ---------------------------------------- adding data----------------------------------------//
  const init = {
    name: "",
    image:"",
    author: "",
    rating: "",
    price: "",
    description: "",
    genre: "",
    year:""
  
  };

  const [data, setdata] = useState(init);

  const { image,name,author,rating,price,description,genre,year } = data;

  const handleInput = (e) => {
    let { name, value } = e.target;
    // console.log(name,value)

    setdata({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postMovies(data));
  };


  return (
    <>
    <AdminNavbar/>

    <Text  fontSize={"28px"} >Add Book</Text>
    <br />

      <form style={{ border:"1px solid black", padding:"10px", width:"50%",margin:"auto" ,
    //  boxShadow:
  boxShadow:" rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"
    }}>
      <Input
          width={"90%"}
          border={"1px solid black"}
          type="text"
          placeholder="image"
          name="image"
          value={image}
          onChange={handleInput}
        />
        <br />
       

        <Input
          width={"90%"}
          marginTop={"10px"}
          border={"1px solid black"}
          type="text"
          placeholder="name "
          name="name"
          value={name}
          onChange={handleInput}
        />
        <br />
        <Input
        marginTop={"10px"}
          width={"90%"}
          border={"1px solid black"}
          type="text"
          placeholder=" author"
          name="author"
          value={author}
          onChange={handleInput}
        />
        <br />
        <Input
          width={"90%"}
          marginTop={"10px"}
          border={"1px solid black"}
          type="text"
          placeholder="year"
          name="year"
          value={year}
          onChange={handleInput}
        />
        <br />
        <Input
          width={"90%"}
          marginTop={"10px"}
          border={"1px solid black"}
          type="text"
          placeholder="rating"
          name="rating"
          value={rating}
          onChange={handleInput}
        />
        <br />
        <Input
          width={"90%"}
          marginTop={"10px"}
          border={"1px solid black"}
          type="text"
          placeholder="price"
          name="price"
          value={price}
          onChange={handleInput}
        />
        <br />
        <Input
        marginTop={"10px"}
        marginBottom={"10px"}
          width={"90%"}
          border={"1px solid black"}
          type="text"
          placeholder="description"
          name="description"
          value={description}
          onChange={handleInput}
        />
        <br />
        <select
      
          style={{ width: "90%", border: "1px solid black", height: "40px" }}
          name="genre"
          id="selecttag"
          value={genre}
          onChange={handleInput}
        >
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Horror">Horror</option>
          <option value="Romance">Romance</option>
        </select>
        <br />
        <Button width={"180px"} backgroundColor={"blue.500"} color={"white"} marginTop={"10px"} 
        onClick={
          handleSubmit
          
        }
        >
          Add Book</Button>
      </form>
    </>
  )
}

export default AddBook