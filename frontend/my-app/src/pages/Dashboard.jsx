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

  const HandleEdit = (id) => {
    dispatch(updateMovies(edit, id));
  };

  const [limit, setLimit] = useState(2);

  const [sort, setSort] = useState("");

  const [category, setCategory] = useState("");

  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(getMovies(query, limit, sort, category));
  }, [query, limit, sort, category]);

  const handleSort = (e) => {
    setSort(e.target.value);

  };

  const handleFilter = (e) => {
    setCategory(e.target.value);
  };

  const search = (e) => {
    setQuery(e.target.value);
  };

  const addtoCart = (el) => {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];

    cartData.push(el);

    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  return (
    <>
      <AdminNavbar />

      <Box display={"flex"} gap={"10px"}>
        
        <Button border={"1px solid black"} backgroundColor={"white"} value={"asc"} onClick={handleSort} marginLeft={"300px"}>
          Low to High
        </Button>

        <Button border={"1px solid black"} backgroundColor={"white"} value={"desc"} onClick={handleSort}>
          High to Low
        </Button>

        <input
          type="text"
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            width: "400px",
            height: "40px",
            marginBottom: "30px",
            marginLeft: "10px",
          }}
          placeholder="search by name"
          onInput={search}
        />

        <select style={{border:"1px solid black",width:"200px", height:"40px",borderRadius:"10px"}} name="" id="" onChange={handleFilter}>
          <option value="">filter by genre</option>
          <option value="Comedy">comedy</option>
          <option value="Horror">horror</option>
          <option value="Romance">romance</option>
          <option value="Action">action</option>
        </select>
      </Box>
      <Grid width={"1500px"} templateColumns="repeat(2, 1fr)">
        {movies.map((el) => {
          return (
            <Box 
            borderRadius={"10px"}
            margin={"auto"}
              key={el._id}
              width={"90%"}
              border={"1px solid black"}
              textAlign={"left"}
            >
              <div style={{ display: "flex" }}>
                <Image
                  src={el.image}
                  width={"300px"}
                  height={"300px"}
                  ml={"150px"}
                />
                <p
                  style={{
                    cursor: "pointer",
                    fontSize: "30px",
                    marginLeft: "70px",
                  }}
                  onClick={() => {
                    addtoCart(el);
                    toast({
                      title: "added to cart",
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                      position: "top",
                    });
                  }}
                >
                  <BsFillHeartFill />
                </p>
              </div>
              <p> Name : {el.name}</p>
              <p> Author: {el.author}</p>
              <p> Year of Release: {el.year}</p>
              <p> Price: {el.price}</p>
              <p> Genre: {el.genre}</p>
              <p> Rating: {el.rating}</p>
              <p> Description of Book{el.description}</p>
              <div style={{ display: "flex", gap: "30px" }}>
                <p
                  style={{
                    border: "1px solid black",
                    cursor: "pointer",
                    fontSize: "30px",
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
                    border: "1px solid black",
                    cursor: "pointer",
                    fontSize: "30px",
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
      {/* </Box> */}

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
