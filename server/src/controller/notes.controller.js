import { Note } from "../model/notes.model";
import { ApiError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";
import { asyncHandler } from "../utils/asyncHandler";

const createNote = asyncHandler(async (req, res) => {

    const note = await Note.create({
        userId: req.user?._id
    })

    if (!note) {
        throw new ApiError(400, "Error while creating a note")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "New note created"
            )
        )
})

const getAllNotes = asyncHandler(async (req, res) => {

    const notes = await Note.find({
        userId: req.user?._id
    })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    notes
                },
                "All notes fetched successfully"
            )
        )
})

const getNote = asyncHandler(async (req, res) => {
    const { noteId } = req.params

    const note = await Note.findById(noteId)

    if (!note) {
        throw new ApiError(400, "Note not found")
    }

    if (note.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not authorized to view this note");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    note
                },
                "Note fetched successfully"
            )
        )
})

const deleteNote = asyncHandler(async (req, res) => {
    const { noteId } = req.params;

    const note = await Note.findById(noteId);

    if (!note) {
        throw new ApiError(404, "Note not found");
    }

    if (note.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not authorized to view this note");
    }

    await note.deleteOne();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Note deleted successfully"
            )
        )
})

export { createNote, getAllNotes, getNote, deleteNote }