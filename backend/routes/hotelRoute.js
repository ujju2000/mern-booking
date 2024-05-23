import express from 'express';
import multer from "multer";
import cloudinary from 'cloudinary';
import Hotel from "../models/hotel.js";
import verifyToken from '../middleware/auth.js';
import zod from 'zod';

const router = express.Router();
const hotelSchema = zod.object({
    
    name : zod.string(),
    country : zod.string(),
    city : zod.string(),
    description : zod.string(),
    type : zod.string(),
    adultCount : zod.string(),
    childCount : zod.string(),
    facilities : zod.array(zod.string()),
    pricePerNight : zod.string(),
    starRating : zod.string(),
    imageUrls : zod.array(zod.string()).optional() 
}) 

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize:5 * 1024  * 1024,  // file size = 5 mb 
  },
  dest : 'uploads/'
});
// api/my-hotels
router.post("/", verifyToken , upload.array("imageFiles", 6), async (req, res) => {
    
    try {
        
        const parsedEnv = hotelSchema.safeParse(req.body);
        if(!parsedEnv.success) {
            return res.status(411).json({message : parsedEnv.error.errors});
        }
        const newHotel = req.body;
        const imagesFiles = req.files;
        
        // upload the images to the cloudinary 
        const uploadPromises = imagesFiles.map(async (image) => {
            
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            // const uploadResult = await cloudinary.v2.uploader.upload_stream(
            //     {resource_type : 'image'},
            //     (error, result) => {
            //         if(error) {
            //             throw new Error(error.message)
            //         }
            //         return result.url;
            //     }
            // ).end(image.buffer);
            // return uploadResult; 
            
            return res.url;
        })
        
        const imageUrls = await Promise.all(uploadPromises);
        
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
        
        const hotel = new Hotel(newHotel);
        await hotel.save();

        res.status(201).send(hotel);
    }
    catch(err) {
        console.log('Error creating hotel: ' , err);
        res.status(500).json({message : 'Something went wrong'});
    }
});
export default router;
