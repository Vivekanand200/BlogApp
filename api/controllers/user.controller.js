// import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
export const test = (req, res) => {
    res.json({ message: "Api is working" });
}

export const updateUser = async (req, res, next) => {
    console.log(req.body.formData.username)
    try {
        console.log("first")
    // if (req.user.formData.id !== req.params.userId) {
    //     return next(errorHandler(403, 'You are not allowed to update this user'));
    // }
    if (req.body.formData.password) {
        if (req.body.formData.password.length < 6) {
            return next( 'Password must be at least 6 characters');
        }
        req.body.formData.password = bcryptjs.hashSync(req.body.formData.password, 10);
    }
    if (req.body.formData.username) {
        if (req.body.formData.username.length < 7 || req.body.formData.username.length > 20) {
            return next('Username must be at least 7 characters and upto 20');
        }
        if (req.body.formData.username.includes(' ')) {
            return next(errorHandler(400, 'Username can not contain spaces'));
        }
        if (req.body.formData.username !== req.body.formData.username.toLowerCase()) {
            return next(errorHandler(400, 'Username must be lowercase'));
        }
        if (!req.body.formData.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, 'Username can only contain letters and numbers'))
        }
    }
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
                $set: {
                    // for update data
                    username: req.body.formData.username === "" ?User.username : req.body.formData.username,
                    email: req.body.formData.email === "" ? User.email : req.body.formData.email,
                    profilePicture: req.body.formData.profilePicture === "" ? User.profilePicture : req.body.formData.profilePicture,
                    password: req.body.formData.password === "" ? User.password : req.body.formData.password
                },
            },
            {
                new: true,
            }
            ).select("-password");
            
            console.log(updatedUser)
            // const {password,...rest} = updatedUser._doc;
            res.status(200).json(updateUser);
        }
        catch (error) {
            next(error);
        }
    }
