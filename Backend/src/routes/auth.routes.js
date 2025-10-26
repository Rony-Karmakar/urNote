import { Router } from "express";
import { emailVerification, getCurrentUser, loginUser, registerUser, resendEmailVerification, userLogout } from "../controller/auth.controller.js";
import { userResgisterValidator, userLoginValidator, resendEmailVerificationValidator } from "../validator/auth.validator.js";
import { validate } from "../middleware/validate.middleware.js";
import { jwtVerify } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/register").post(userResgisterValidator(), validate, registerUser)
router.route("/login").post(userLoginValidator(), validate, loginUser)
router.route("/verify-email/:verificationToken").get(emailVerification)
router.route("resend-email-verification").post(resendEmailVerificationValidator, validate, resendEmailVerification)

router.route("/logout").get(jwtVerify, userLogout)
router.route("/current-user").get(jwtVerify, getCurrentUser)

export default router