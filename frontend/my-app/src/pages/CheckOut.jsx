import React from 'react'
import "../styles/Checkout.css"
import { Link } from 'react-router-dom'
const CheckOut = () => {


    let cartData = JSON.parse(localStorage.getItem("cart")) || [];

    let totalPrice = 0;

    let name="";
  
    for (let i = 0; i < cartData.length; i++) {
  
      totalPrice += cartData[i].price;
  
     name += cartData[i].name +" , "
    }




  return (
   <>
   <div id="wrapper">
	<div class="container1">
		<div class="order">
			<h2>Your order summary</h2>
        
        {
            cartData.map((el)=>{
             return(
                <>
                 <div class="item">
				<img src={el.image} alt=''/>
				<div class="info">
					<h4>Name : {el.name}</h4>
					<p class="quantity">Rating : {el.rating}</p>
					<p class="price">Price : {el.price}</p>
				</div> 
			</div>
                </>
             )
               
            })
        }


			
			 
			
			<h4 class="ship">Shipping: FREE</h4>
			<hr/>
			<h3 class="total">TOTAL: Rs. {totalPrice}</h3>
		</div> 
	</div> 
	
	<div class="container2">
		<div class="checkout">
			<p><i class="fas fa-check-circle"></i>Shipping</p>
			<p><i class="fas fa-check-circle"></i>Checkout</p>
			<p><i class="fas fa-check-circle"></i>Confirmation</p>
			
			<div class="payment">
				<div class="content">
					<div class="infos">
						<div class="method">
							<h2>Choose a payment method</h2>
							<img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/1978060/visa.png' alt='' class="visa"/>
							<img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/1978060/mastercard.png' alt='' class="mastercard"/>
							<img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/1978060/paypal.png' alt='' class="paypal"/>
						</div> 
						<div class="cardNumber">
							<p class="title">Credit card number</p><br/>
							<input type="text" class="number"/>
							<input type="text" class="number"/>
							<input type="text" class="number"/>
							<input type="text" class="number"/>							
						</div> 
						<div class="cardHolderName">
							<p class="title">Card holder name</p>
							<input type="text"/>
						</div> 
						<div class="expiration">
							<p class="title">Expiration date</p>
							<select>
								<option>Month</option>
								<option>01</option>
								<option>02</option>
								<option>03</option>
							</select>
							
							<select>
								<option>Year</option>
								<option>2019</option>
								<option>2020</option>
								<option>2021</option>
							</select>
						</div> 
						<div class="security">
							<p class="title">Security</p>
							<input type="text"/>
						</div>

                        <Link to={'/'}>
						<button> Checkout</button>
                        </Link>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

   </>
  )
}

export default CheckOut