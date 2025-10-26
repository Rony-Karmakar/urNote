import { User } from "../model/user.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { sendMail, emailVerificationMaligenContent } from "../utils/mail.js";
import crypto from "crypto"

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists", [])
    }

    const user = await User.create({
        username,
        email,
        password,
        isVerified: false
    })

    const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken()

    user.verificationToken = hashedToken
    user.verificationTokenExpiry = tokenExpiry

    await user.save({ validateBeforeSave: false })

    await sendMail({
        email: user?.email,
        subject: "Please verify your email",
        mailgenContent: emailVerificationMaligenContent(
            user.username,
            `${req.protocol}://${req.get("host")}/api/v1/auth/verify-email/${unHashedToken}`
        )
    })

    const createdUser = await User.findById(user._id).select(
        "-password -verificationToken -verificationTokenExpiry"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            { user: createdUser },
            "user registered sureccessfully and verification email has been send on your email"
        )
    )
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email) {
        throw new ApiError(400, "Username or email is required")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(400, "User does not exist")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid creadentials")
    }

    const accessToken = user.generateAccessToken()

    const loggedUser = await User.findById(user._id).select(
        "-password -verificationToken -verificationTokenExpiry"
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedUser,
                    accessToken
                },
                "User logged in successfully"
            )
        )
})

const emailVerification = asyncHandler(async (req, res) => {
    const { verificationToken } = req.params

    if (!verificationToken) {
        throw new ApiError(400, "Email verification token is missing")
    }

    let hashedToken = crypto
        .createHash("sha256")
        .update(verificationToken)
        .digest("hex")

    const user = await User.findOne({
        verificationToken: hashedToken,
        verificationTokenExpiry: { $gt: Date.now() }
    })

    if (!user) {
        throw new ApiError(400, "Token is invalid or expired")
    }

    user.verificationToken = undefined
    user.verificationTokenExpiry = undefined
    user.isVerified = true

    await user.save({ validateBeforeSave: false })

    res.status(200).json(
        new ApiResponse(
            200,
            {
                isVerified: true
            },
            "Email is verified successfully"
        )
    )
})

const userLogout = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .json(
            new ApiResponse(200, {}, "User logged out")
        )
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    user: req.user
                },
                "Current fetched succesfully"
            )
        )
})

const resendEmailVerification = asyncHandler(async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({
        email: email
    })

    if (!user) {
        throw new ApiError(400, "User doesn't exist")
    }

    if (user.isVerified) {
        throw new ApiError(409, "Email is already verified");
    }

    const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken()

    user.verificationToken = hashedToken
    user.verificationTokenExpiry = tokenExpiry

    await user.save({ validateBeforeSave: false })

    await sendMail({
        email: user?.email,
        subject: "Please verify your email",
        mailgenContent: emailVerificationMaligenContent(
            user.username,
            `${req.protocol}://${req.get("host")}/api/v1/auth/verify-email/${unHashedToken}`
        )
    })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Mail has been sent to your email Id"
            )
        )
})

const changePassword = asyncHandler(async (req, res) => {

    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user?._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Password is incorrect")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Password changed successfully"
            )
        )

})

export { registerUser, loginUser, userLogout, emailVerification, getCurrentUser, resendEmailVerification, changePassword }