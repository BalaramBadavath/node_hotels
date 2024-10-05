const jwt = require('jsonwebtoken')
const jwtAuthMiddleware = (req,res,next)=>{

    const authHeader = req.headers.authorisation
    if(!authHeader) return res.status(401).send({message:'No token provided'})

    //extract token from header
    const token = req.headers.authorisation.split(' ')[1]
    if(!token) return res.status(401).json({message :"Unauthorized"});
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    }
    catch(err){
        console.log(err)
        res.send(401).json({message: "Invalid Token"})
    }
}

const generateToken = (userData)=>{
    return jwt.sign({userData}, process.env.JWT_SECRET, {expiresIn: "1D"})
}

module.exports = {jwtAuthMiddleware,generateToken}