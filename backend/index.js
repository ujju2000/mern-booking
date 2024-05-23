import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import cookieParser from 'cookie-parser';
import {v2 as cloudinary} from 'cloudinary';
import hotelRoute from './routes/hotelRoute.js';
import path from 'path';
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET

})

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING).then(msg => console.log('database connected'));

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.static(path.dirname('../../frontend/dist')));

app.use('/api/users',userRoute);
app.use('/api/auth', authRoute);
app.use('/api/my-hotel' , hotelRoute);
app.get('/' , async (req,res) => {
    res.json({message : 'hello from endpoints'})
})

app.listen(8000 , () => console.log('server running'));
