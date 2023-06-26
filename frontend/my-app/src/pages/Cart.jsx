import React from "react";
import AdminNavbar from "../components/adminNavbar";
import { Box, Image, Grid, Text,Button } from "@chakra-ui/react";
import { RiDislikeFill } from "react-icons/ri";
import { useToast } from "@chakra-ui/react";
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
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  let cartData = JSON.parse(localStorage.getItem("cart")) || [];

  const removeFromCart = (id) => {

    let deldata = JSON.parse(localStorage.getItem("cart")) || [];

    deldata.splice(id, 1);

    localStorage.setItem("cart", JSON.stringify(deldata));

   Loadit()
  };

  function Loadit() {
    window.location.reload();
  }

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

     
      
        <Text padding={"10px"} border={"0px solid black"} marginBottom={"30px"} fontSize={"22px"}>
          Total number of books in cart : {cartData.length}{" "}
        </Text>

       


      <Grid templateColumns="repeat(2, 1fr)" gap={"30px"}>

      {cartData.map((el) => {
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
                  ml={"150px"}
                  marginBottom={"20px"}
                />
                <p
                  style={{
                    cursor: "pointer",
                    fontSize: "30px",
                    marginLeft: "70px",
                  }}
                  onClick={() => {
                    removeFromCart(el.id);
                    toast({
                      title: "removed from cart",
                      status: "success",
                      duration: 1000,
                      isClosable: true,
                      position: "top",
                    });
                  }}
                >
                  <RiDislikeFill/>
                </p>
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


            </Box>
          );
        })}
      </Grid>
    </>
  );
};

export default Cart;
