import jwt from 'jsonwebtoken'


const verifyToken = (req, res, next ) => {
    const token = req.cookies.access_token;

    console.log('token -->> ', token)

    if (!token) {
        return res.status(400).json({ success: false, message: 'You are not authenticated!'});
        }
    
    jwt.verify(
        token, 
        process.env.JWT_SECRET,
        async(err, user) => {
            console.log(user)
            if (err) return res.status(400).json({ message: "Token is invalid!"})
            else console.log('JWT verified successfully')
            req.user = user;
            next()
        }
    )
}


export { verifyToken }