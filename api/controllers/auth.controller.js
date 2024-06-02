import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

//register
export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (username === '' ||
        email === "" ||
        password === '' ||
        !username ||
        !email ||
        !password) {
        return next(errorHandler(400, "Necessary to fill all required fields"));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10)


    try {
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })
        await newUser.save();
        res.json({ message: 'SignUp successful' })
    }
    catch (error) {
        next(error);
    }

};

//login
export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === "" ||password === '') {
        return next(errorHandler(400, "All fields are required"));
    }

    try {
        const validUser = await User.findOne({ email });
        console.log(validUser);
        if (!validUser) {
            return next(errorHandler(400, "User Not Found"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        console.log(validPassword);
        if (!validPassword) {
            return next(errorHandler(400, "Invalid Password"));
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        res.json({data: validUser,token}).status(200)
        // const { password: pass, ...rest } = validUser._doc;
    }
    catch (error) {
        console.log(error.message);
        next(error);
    }
};

//google

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;

    try {
const user = await User.findOne({email})
if(user){
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
    const {password,...rest} = user._doc;
    res.status(200).cookie('access_token', token, {
        httpOnly: true,
    }).json(rest);
}else{
    const generatedPassword = Math.random().toString(36).slice(-8)+ Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
    const newUser = new User({
        username:name.toLowerCase().split('')+ Math.random().toString(9).slice(-4),
        email,
        password:hashedPassword,
        profilePicture:googlePhotoUrl,

    });
    await newUser.save();
    const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
    const {password,...rest}=newUser._doc;
    res
    .status(200)
    .cookie('access_token',token,{
        httpOnly:true,
    })
    .json(rest);
}
    }
    catch (error) {
        next(error);
    }
};