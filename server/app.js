import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongoDB.js';
import authRouter from './routes/auth.router.js'
import userRouter from './routes/user.router.js'

const app =express();
const port = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(cookieParser())
app.use(cors({credentials:true}));

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})