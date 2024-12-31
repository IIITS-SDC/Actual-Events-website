import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
        expiresIn: "5d",
    });

    res.cookie("jwt", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV !== "development", // Secure in production and development
        sameSite: "Strict",
        maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days in milliseconds
    });
};

export default createTokenAndSaveCookie;

