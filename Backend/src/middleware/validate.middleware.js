import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error.js";

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => ({
            field: err.path,
            message: err.msg,
        }));

        throw new ApiError(400, "Validation Error", extractedErrors);
    }

    next();
};

export { validate }