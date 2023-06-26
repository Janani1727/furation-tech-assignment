import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsFillHeartFill } from "react-icons/bs";
import { useToast } from "@chakra-ui/react";
import { getMovies, deleteMovies, updateMovies } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Button, Input, Box } from "@chakra-ui/react";


import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Grid,
  useDisclosure,
} from "@chakra-ui/react";

import axios from "axios";

import AdminNavbar from "../components/adminNavbar";

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  // // ---------------------------------------- adding data----------------------------------------//
  const init = {
    poster: "",
    title: "",
    director: "",
    year: "",
    IMDB_Rating: "",
    genre: "",
    ticket: "",
  };

  // ---------------------------------------- display data----------------------------------------//

  const movies = useSelector((store) => store.movie.movies);
  // console.log("movies", movies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies);
  }, [dispatch]);

  // ----------------------------------------Delete data----------------------------------------//

  const handleDelete = (_id) => {
    dispatch(deleteMovies(_id));
    // window.location.reload(true);
  };

  // ----------------------------------------Update data----------------------------------------//

  const [edit, setEdit] = useState(init);

  const hanldeClickEidt = (el) => {
    setEdit({ ...el });
    onOpen();
  };

  const HandleUpdateData = (e) => {
    let { name, value } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  const HandleEdit = (_id) => {
    dispatch(updateMovies(edit, _id));
    // window.location.reload(true);
  };

  const [limit, setLimit] = useState(2);

  const [sort, setSort] = useState("");

  const [category, setCategory] = useState("");

  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(getMovies( query, limit,sort,category));
  }, [  query, limit,sort,category]);

  const handleSort = (e) => {
    setSort(e.target.value);

  };

  const handleFilter = (e) => {
    setCategory(e.target.value);
  };

  const search = (e) => {
    console.log(e.target.value);
    setQuery(e.target.value);
    // handleSearch(e.target.value);
    
  };

  // const handleSearch = (query) => {
  //   axios.get(`https://weak-blue-capybara-tie.cyclic.app/get?name=${query}`)
  // }
  
  const addtoCart = (el) => {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];

    cartData.push(el);

    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  return (
    <>
      <AdminNavbar />

      <Box display={"flex"} gap={"10px"} marginTop={"10px"}>
        
        <button 
         
         style={{
          border:"1px solid black",
          color:"black",
          marginLeft:"200px",
          width:"220px",
          height:"40px",

         }}
         
         value="asc" onClick={handleSort} marginLeft={"300px"}>
          Low to High
        </button>

        <button   style={{
          border:"1px solid black",
          color:"black",
          
          width:"220px",
          height:"40px",

         }}value="desc" onClick={handleSort}>
          High to Low
        </button>

        <input
          type="text"
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            width: "400px",
            height: "30px",
            marginTop:"-10px",
            marginBottom: "30px",
            marginLeft: "10px",
          }}
          placeholder="search by Entering full name"
          onInput={search}
        />
         <p>filter by genre</p>
        <select style={{border:"1px solid black",width:"200px", marginTop:"-10px",color:"black", height:"40px",borderRadius:"10px"}}  onChange={handleFilter}>
         
          
          <option value="Comedy">comedy</option>
          <option value="Horror">horror</option>
          <option value="Romance">romance</option>
          <option value="Action">action</option>
        </select>
      </Box>
      <Grid width={"1500px" }  templateColumns="repeat(2, 1fr)">

        {movies.map((el) => {
          return (
            <Box 
            boxShadow={"lg"}
            borderRadius={"10px"}
            margin={"auto"}
              key={el._id}
              width={"90%"}
              height={"100%"}
              border={"1px solid black"}
              textAlign={"left"}
            >
              <div style={{ display: "flex" }}>
                <Image
                  src={el.image}
                  width={"400px"}
                  height={"350px"}
                  ml={"140px"}
                  marginBottom={"20px"}
                />
               
               <div style={{
                    display:"flex",
                    width:"100px",
                    marginTop:"10px"
                  }}>

                <p style={{
                    fontSize:"18px"
                  }}>Add to Cart</p>
                <p
                  style={{
                    cursor: "pointer",
                    fontSize: "30px",
                  
                  }}
                  onClick={() => {
                    addtoCart(el);
                    toast({
                      title: "added to cart",
                      status: "success",
                      duration: 1000,
                      isClosable: true,
                      position: "top",
                    });
                  }}
                  >
                 <BsFillHeartFill />
                </p>
                  </div>
              </div>

              <div style={{display:"flex",gap:"75px"}}>
              <p style={{fontSize:"20px", marginLeft:"20px"}}>Name : </p>
              <p style={{textAlign:"center"}}>{el.name}</p>
              </div>
              
              <div  style={{display:"flex",gap:"68px"}}>
              <p style={{fontSize:"20px", marginLeft:"20px"}}> Author : </p>
              <p style={{textAlign:"center"}}>{el.author}</p>
              </div>

              <div  style={{display:"flex",gap:"10px"}}>
              <p style={{fontSize:"20px", marginLeft:"20px"}}>Year of Release : </p>
              <p style={{textAlign:"center"}}>{el.year}</p>
              </div>

              <div  style={{display:"flex",gap:"80px"}}>
              <p style={{fontSize:"20px", marginLeft:"20px"}}>Price :</p>
              <p style={{textAlign:"center"}}> {el.price}</p>
              </div>

              <div  style={{display:"flex",gap:"70px"}}>
              <p style={{fontSize:"20px", marginLeft:"20px"}}>Genre : </p>
              <p style={{textAlign:"center"}}>{el.genre}</p>
              </div>

              <div  style={{display:"flex",gap:"70px"}}>
              <p style={{fontSize:"20px", marginLeft:"20px"}}> Rating  :</p>
              <p style={{textAlign:"center"}}> {el.rating}</p>
              </div>


              <div  style={{display:"flex",gap:"35px" , marginBottom:"20px"}}>
              <p style={{fontSize:"20px", marginLeft:"20px"}}>Description of Book : </p>
              <p style={{textAlign:"left"}}>{el.description}</p>
              </div>


              <div style={{ display: "flex", gap: "30px" , marginLeft:"150px" }}>
                <p
                  style={{
                    border: "0px solid black",
                    cursor: "pointer",
                    fontSize: "30px",
                    color:"blue"
                  }}
                  onClick={() => hanldeClickEidt(el)}
                >
                <FaEdit /> 
                </p>

                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Edit Data</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <form>
                        <Input
                          width={"100%"}
                          border={"1px solid black"}
                          type="text"
                          placeholder="image"
                          name="image"
                          value={edit.image}
                          onChange={HandleUpdateData}
                        />
                        <br />
                        <Input
                          width={"100%"}
                          border={"1px solid black"}
                          type="text"
                          placeholder="name"
                          name="name"
                          value={edit.name}
                          onChange={HandleUpdateData}
                        />
                        <br />
                        <Input
                          width={"100%"}
                          border={"1px solid black"}
                          type="text"
                          placeholder="author"
                          name="author"
                          value={edit.author}
                          onChange={HandleUpdateData}
                        />
                        <br />
                        <Input
                          width={"100%"}
                          border={"1px solid black"}
                          type="text"
                          placeholder="Rating"
                          name="rating"
                          value={edit.rating}
                          onChange={HandleUpdateData}
                        />
                        <br />
                        <Input
                          width={"100%"}
                          border={"1px solid black"}
                          type="text"
                          placeholder="year"
                          name="year"
                          value={edit.year}
                          onChange={HandleUpdateData}
                        />
                        <br />
                        <Input
                          width={"100%"}
                          border={"1px solid black"}
                          type="text"
                          placeholder="price"
                          name="price"
                          value={edit.price}
                          onChange={HandleUpdateData}
                        />
                        <br />
                        <Input
                          width={"100%"}
                          border={"1px solid black"}
                          type="text"
                          placeholder="description"
                          name="description"
                          value={edit.description}
                          onChange={HandleUpdateData}
                        />
                        <br />
                        <select
                          style={{
                            width: "100%",
                            border: "1px solid black",
                            height: "40px",
                          }}
                          name="genre"
                          id="selecttag"
                          value={edit.genre}
                          onChange={HandleUpdateData}
                        >
                          <option value="Action">Action</option>
                          <option value="Comedy">Comedy</option>
                          <option value="Horror">Horror</option>
                          <option value="Romance">Romance</option>
                        </select>
                        <br />
                        <Button
                          onClick={() => {
                            HandleEdit(el._id);
                            onClose();
                          }}
                        >
                          update
                        </Button>
                      </form>
                    </ModalBody>
                  </ModalContent>
                </Modal>

                <p
                  style={{
                    border: "0px solid black",
                    cursor: "pointer",
                    fontSize: "30px",
                    color:"red",
                    marginLeft:"50px"
                  }}
                  onClick={() => handleDelete(el._id)}
                >
                 <MdDelete />
                </p>
              </div>
            </Box>
          );
        })}
      </Grid>
    

      <div
        style={{
          display: "flex",
          gap: "50px",
          
          marginLeft: "38%",
          marginTop: "30px",
        }}
      >
        <Button
          backgroundColor={"blue.500"}
          color={"white"}
          width={"150px"}
          onClick={() => setLimit(limit - 5)}
        >
          PREVIOUS
        </Button>

        <Button
         width={"150px"}
         color={"white"}
          backgroundColor={"blue.500"}
          onClick={() => setLimit(limit + 5)}
        >
          NEXT
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
