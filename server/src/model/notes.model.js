import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        trim: true,
        default: "New note"
    },
    content: {
        type: String,
        required: true,
        default: ""
    },
    tags: [
        {
            type: String,
            trim: true,
        },
    ],
    isPrivate: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
}
)

export const Note = mongoose.model("Note", noteSchema)