import jwt from "jsonwebtoken";

// User Authentication Middleware
const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized. Please log in again.",
            });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = token_decode.id; // ✅ store decoded userId safely

        next();
    } catch (error) {
        console.log("Auth Error:", error.message);
        res.status(401).json({
            success: false,
            message: "Unauthorized: " + error.message,
        });
    }
};

export default authUser;
