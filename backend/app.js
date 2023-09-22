const express=require('express')
const app=express();
const errorMiddleware=require('./middleware/error')
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser')
const fileUpload=require('express-fileupload')
// const dotenv = require("dotenv");
const path = require("path");

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

// app.get("/api/v1/order/me",(req,res)=>
// {
//     console.log("Hek");
//     res.send("Check!")

// })

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }
const product=require('./routes/productRoute');
app.use('/api/v1',product);

const user=require('./routes/userRoute')
const order=require('./routes/orderRoute')
const payment=require('./routes/paymentRoute')

app.use('/api/v1',user);
app.use('/api/v1',order);
app.use('/api/v1',payment)


//----------------------------------------------DEPLOYMENT-----------------------------------

if(process.env.NODE_ENV==="PRODUCTION")
{
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
}

//----------------------------------------------DEPLOYMENT-----------------------------------

// Middleware For Error Handling
app.use(errorMiddleware)


module.exports=app