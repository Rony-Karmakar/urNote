import { Router } from "express";
import { jwtVerify } from "../middleware/auth.middleware";
import { createNote, deleteNote, getAllNotes, getNote } from "../controller/notes.controller";
import { getNoteValidator, deleteNoteValidator } from "../validator/notes.validator.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

router.route("/").post(jwtVerify, createNote);

router.route("/").get(jwtVerify, getAllNotes);

router.route("/:noteId").get(getNoteValidator(), validate, validatorjwtVerify, getNote);

router.route("/:noteId").delete(deleteNoteValidator(), validate, jwtVerify, deleteNote);

export default router;