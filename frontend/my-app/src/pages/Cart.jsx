import React from "react";
import AdminNavbar from "../components/adminNavbar";
import { Box, Image, Grid, Text,Button } from "@chakra-ui/react";
import { RiDislikeFill } from "react-icons/ri";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
 
  useDisclosure,
} from "@chakra-ui/react";


const Cart = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  let cartData = JSON.parse(localStorage.getItem("cart")) || [];

  const removeFromCart = (id) => {

    let deldata = JSON.parse(localStorage.getItem("cart")) || [];

    deldata.splice(id, 1);

    localStorage.setItem("cart", JSON.stringify(deldata));

    window.location.reload();
  };

  let totalPrice = 0;

  let name="";

  for (let i = 0; i < cartData.length; i++) {

    totalPrice += cartData[i].price;

   name += cartData[i].name +" , "
  }

  const payment = ()=>{
      alert("payment succesfully received")
      onClose()
  }
   

  return (
    <>
      <AdminNavbar />

      <div
        style={{
          display: "flex",
          gap: "100px",
          marginBottom: "30px",
          marginLeft: "400px",
        }}
      >
        <Text padding={"10px"} border={"1px solid black"} fontSize={"22px"}>
          Total number of books in cart : {cartData.length}{" "}
        </Text>

        <Text padding={"10px"} border={"1px solid black"} fontSize={"22px"}>
          {" "}
          Total amount : Rs.{totalPrice} /-
        </Text>


        <Button border={"1px solid black"} backgroundColor={"white"}
         onClick={onOpen}
      
        >
          CheckOut to payment
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>payment process</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody padding={"10px"}>
                      
                     <p> Book Name: {name}</p>
                    <br />
                     <p> Total Price: Rs. {totalPrice}</p>

                    </ModalBody>

                    <Button onClick={ 
                      payment
                  
                      } marginBottom={"20px"} marginLeft={"120px"} width={"200px"} backgroundColor={"blue.500"}>
                        continue payment
                    </Button>

                  </ModalContent>
                </Modal>

      <Grid templateColumns="repeat(2, 1fr)" gap={"30px"}>
        {cartData.map((el) => {
          return (
            <Box
              margin={"auto"}
              key={el._id}
              width={"80%"}
              border={"1px solid black"}
              textAlign={"left"}
            >
              <div style={{ display: "flex" }}>
                <Image
                  src={el.image}
                  width={"300px"}
                  height={"300px"}
                  ml={"90px"}
                />
                <p
                  style={{
                    cursor: "pointer",
                    fontSize: "30px",
                    marginLeft: "50px",
                  }}
                  onClick={() => removeFromCart(el.id)}
                >
                  <RiDislikeFill />
                </p>
              </div>
              <p>Name : {el.name}</p>
              <p>Author: {el.author}</p>
              <p>Year of Release: {el.year}</p>
              <p> Price: {el.price}</p>
              <p> Genre: {el.genre}</p>
              <p> Rating: {el.rating}</p>
              <p>Description of Book{el.description}</p>
            </Box>
          );
        })}
      </Grid>
    </>
  );
};

export default Cart;
