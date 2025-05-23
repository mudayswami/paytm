const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");

const authMiddleware = async (req, res, next)=>{
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({
            message:"Provide a token"
        });
    }
    const token = authHeader.split(' ')[1];
        try{
        const validate  = await jwt.verify(token, JWT_SECRET);
        req.userId = validate.id;
        next();
        }catch(err){
            return res.status(403).json({message:err})
        }
};

module.exports = {authMiddleware}