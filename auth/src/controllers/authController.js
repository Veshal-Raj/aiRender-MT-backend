import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { isValidEmail, isValidName, isValidPassword } from "../middlewares/validations";
import user from '../models/userModel'


export const login = async(req, res, next) => {
    try {
        const { email, password } = req.body;
    let existUser = await user.findOne({ email: email})
    if (!existUser) {
        return res.status(301).json({ success: false, message: "No user found."})
    }

    const validatePassword = bcryptjs.compareSync(password, existUser.password);

    if (!validatePassword) {
        return res.status(400).json({ success: false, message: "password doesn't matched"})
    }

    let token = jwt.sign(
        {id: existUser._id},
        process.env.JWT_SECRET
    )

    const expiryDate = new Date(Date.now() + 3600000)

    res.cookie("access_token", token || "", {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        expries: expiryDate
    })

    res.status(200).json({ success: true, userDetails: existUser })
    } catch (error) {
        next(error)
    }
}

export const  signUp = async (req, res, next) => {
    console.log(req.body)
    const {name, email , password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, Email and Password are requried fields."
            })
        }

        if (!isValidEmail( email )) {
            return res.status(400).json({ success: false, message: "Invalid email format"})
        }

        let emailExist = await user.findOne({ email : email })

        if (emailExist) {
            return res.status(400).json({ success: false, message: "User already exist!"})
        }

        if (!isValidName( name )) {
            return res.status(400).json({ success: false, message: "Invalid name format"})
        }


        if (!isValidPassword( password )) {
            return res.status(400).json({ success: false, message: "Invalid password format"})
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const userDetails = new user({
            name: name,
            email: email,
            password: hashedPassword
        })

        await userDetails.save()

        return res.status(200).json({ success: true, message: "User created succesfully"})

    } catch (error) {
        next(error)
    }
}

export const home = (req, res, next) => {
    return res.status(200).json({ success: true, message: 'User home page!'})
}