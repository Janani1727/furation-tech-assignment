const express = require('express')
const cors = require("cors")
const app = express()
const {connection}=require("./db")


app.use(express.json())
app.use(cors())
// const {userRouter} =require("./routes/userRoute")
const {bookRouter} = require("./routes/Book.Routes")

app.get('/', (req, res) => {
    res.send('Hello!')
})
// app.use("/users",userRouter)
app.use("/",bookRouter)


app.listen('4000', async(req, res) => {
    try {
        await connection
        console.log("connected to db");
    } catch (error) {
        console.log(error)
    }
    console.log('Server is running!')
})