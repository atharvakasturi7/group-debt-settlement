import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).json({ message: "Unauthorized" })

    // 1) Extract Token
    const token = authHeader.split(' ')[1];
    
    // 2) Verify Token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
   
};



export default authMiddleware;