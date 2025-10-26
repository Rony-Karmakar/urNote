import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/api-error.js";

export const jwtVerify = async (req, res, next) => {

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        console.log(token)

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const userId = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(userId._id).select("-password -verificationToken -verificationTokenExpiry")

        if (!user) {
            throw new ApiError(401, "Invalid access token")
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, "Invalid access token")
    }

}