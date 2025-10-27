import { param } from "express-validator";

const getNoteValidator = () => {
    return [
        param("noteId")
            .isMongoId()
            .withMessage("Invalid note ID"),
    ]
}

const deleteNoteValidator = () => {
    return [
        param("noteId")
            .isMongoId()
            .withMessage("Invalid note ID"),
    ]
}

export { getNoteValidator, deleteNoteValidator }