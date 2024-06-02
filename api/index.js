import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("MongoDB connected")
})
.catch((err)=>{
    console.log(err)
});

const app = express();
app.use(cookieParser());
app.use(express.json());
const corsOptions = {
    origin: '*', // Update with your frontend domain
    credentials: true, // Enable cookies with CORS
  };
app.use(cors(corsOptions));

app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);

//middleware
app.use((err, req,res,next)=>{

    const statusCode =err.statusCode||500;
    const message = err.message||'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(3000,()=>{
    console.log("Server listening on port 3000")
});