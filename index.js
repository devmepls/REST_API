const express = require('express');
const mongoose= require('mongoose');
const app = express();
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');


const morgan=require('morgan')
app.use(morgan("dev"))
dotenv.config();
mongoose.connect(process.env.MONGo_URL
) .then(() => console.log("DB succesfull Connected"));
app.use(express.json());


 app.use("/api/user",userRoute);
 app.use("/api/auth",authRoute);
 app.use("/api/product",productRoute);
app.listen(process.env.PORT || 5000,() => {
    console.log('listening on port');
});

 