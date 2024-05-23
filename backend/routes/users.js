import express from 'express';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = express.Router();
import zod from 'zod';

const registerSchema = zod.object({
    username : zod.string(),
    lastName : zod.string().optional(),
    password : zod.string(),
    email : zod.string()
})

router.post('/register' , async (req,res) => {
    
    try {
        const {success} = registerSchema.safeParse(req.body);
        if(!success) {
            return res.status(411).json({
                message : 'Incorrect Inputs'
            })
        }
        let user = await User.findOne({email : req.body.email});
        if(user){
            return res.status(400).json({message : 'User already exist'});
        }
        const hashedPassword = await bcrypt.hash(req.body.password , 10);
        
        user = new User({
            username : req.body.username,
            password : hashedPassword,
            firstName : req.body.firstName, 
            lastName : req.body.lastName,
            email : req.body.email
        });
        await user.save();

        const token = jwt.sign({userId : user.id}, process.env.JWT_SECRET, 
        {
            expiresIn: "1d",
        });

        res.cookie('auth_token' , token, {
            httpOnly : true,
            secure : process.env.NODE_ENV ===   "production",
            maxAge : 86400000 
        })

        return res.status(200).send({message : 'registration successfull'});
    }
    catch(err){
        console.log(err);
        res.status(500).send({message : 'Something went wrong'});
    }
})

export default router;