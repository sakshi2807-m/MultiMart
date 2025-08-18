import jwt from "jsonwebtoken";

// User Authentication Middleware
const authVendor = async (req, res, next) => {
    try {
        const { vtoken } = req.headers;

        if (!vtoken) {
            return res.status(401).json({
                success: false,
                message: "Not authorized. Please log in again.",
            });
        }

        const vtoken_decode = jwt.verify(vtoken, process.env.JWT_SECRET);

        req.vendorId = vtoken_decode.id; 

        next();
    } catch (error) {
        console.log("Auth Error:", error.message);
        res.status(401).json({
            success: false,
            message: "Unauthorized: " + error.message,
        });
    }
};

export default authVendor;
