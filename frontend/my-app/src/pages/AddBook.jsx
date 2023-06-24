import React from 'react'

import {
    postMovies,
  
  } from "../redux/action";
  import { useDispatch, useSelector } from "react-redux";
  import { useState, useEffect } from "react";
  import { Button, Input } from "@chakra-ui/react";
  import { useParams } from "react-router-dom";
  import AdminNavbar from "../components/adminNavbar";

const AddBook = () => {

    const dispatch = useDispatch();
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
    <h1>add Movie</h1>
      <form>
      <Input
          width={"40%"}
          border={"1px solid black"}
          type="text"
          placeholder="image"
          name="image"
          value={image}
          onChange={handleInput}
        />
        <br />
        <Input
          width={"40%"}
          border={"1px solid black"}
          type="text"
          placeholder="name "
          name="name"
          value={name}
          onChange={handleInput}
        />
        <br />
        <Input
          width={"40%"}
          border={"1px solid black"}
          type="text"
          placeholder=" author"
          name="author"
          value={author}
          onChange={handleInput}
        />
        <br />
        <Input
          width={"40%"}
          border={"1px solid black"}
          type="text"
          placeholder="year"
          name="year"
          value={year}
          onChange={handleInput}
        />
        <br />
        <Input
          width={"40%"}
          border={"1px solid black"}
          type="text"
          placeholder="rating"
          name="rating"
          value={rating}
          onChange={handleInput}
        />
        <br />
        <Input
          width={"40%"}
          border={"1px solid black"}
          type="text"
          placeholder="price"
          name="price"
          value={price}
          onChange={handleInput}
        />
        <br />
        <Input
          width={"40%"}
          border={"1px solid black"}
          type="text"
          placeholder="description"
          name="description"
          value={description}
          onChange={handleInput}
        />
        <br />
        <select
          style={{ width: "40%", border: "1px solid black", height: "40px" }}
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
        <Button onClick={handleSubmit}>Add Movie</Button>
      </form>
    </>
  )
}

export default AddBook