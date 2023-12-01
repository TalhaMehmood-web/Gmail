import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import cookie from "cookie";

const createToken = (_id, name, email) => {
    const payload = {
        _id,
        name,
        email,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
};


export const SignUp = async (req, res) => {
    const { name, email, username, password } = req.body;
    const picture = req.file.filename;
    try {


        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are mandatory to be filled!" });
        }

        const isEmail = await User.findOne({ email });
        if (isEmail) {
            return res.status(400).json({ message: "Email Already Exists" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email format" });
        }




        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            username,
            email,
            password: hash,
            picture,
        });

        const token = createToken(user._id, user.name, user.email);
        res.setHeader("Set-Cookie", cookie.serialize("token", token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 }));
        res.status(201).json({
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            picture: user.picture,
            token: token,
        });


    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Incorrect email" })
        }
        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            return res.status(400).json({ message: "Incorrect Password" })
        }
        const token = createToken(user._id, user.name, user.email);
        res.setHeader("Set-Cookie", cookie.serialize("token", token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 }));
        res.status(201).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            picture: user.picture,
            token: token,
        })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}