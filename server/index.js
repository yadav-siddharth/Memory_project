import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose  from "mongoose";
import postRoutes from "./routes/post.js";
import userRoutes from "./routes/user.js";
import dotenv from 'dotenv';


const app = express();
dotenv.config();
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors());

// Routes
app.use('/post',postRoutes);
app.use('/user',userRoutes);

// Database connection 
const PORT = process.env.PORT ||5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser: true , useUnifiedTopology: true})
          .then(()=>app.listen(PORT,() => console.log(`Server running on port ${PORT}`)))
          .catch((error)=>console.log(error.message));


