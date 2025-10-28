import { param } from "express-validator";

const getNoteValidator = () => {
    return [
        param("noteId")
            .isMongoId()
            .withMessage("Invalid note ID"),
    ]
}

const updateNoteValidator = () => {
    return [
        param("noteId")
            .isMongoId()
            .withMessage("Invalid note ID"),
        body("title")
            .optional()
            .isString()
            .trim()
            .isLength({ max: 100 }),
        body("content")
            .optional()
            .isString(),
        body("tags")
            .optional()
            .isArray(),
        body("isPrivate")
            .optional()
            .isBoolean(),
    ]
}

const deleteNoteValidator = () => {
    return [
        param("noteId")
            .isMongoId()
            .withMessage("Invalid note ID"),
    ]
}

export { getNoteValidator, updateNoteValidator, deleteNoteValidator }