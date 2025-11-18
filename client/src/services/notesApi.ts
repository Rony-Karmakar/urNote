import { axiosInstance } from "@/lib/axios";
import { useNoteStore } from "@/store/noteStore";
import type { Note } from "@/types/note";

export async function getNotes() {
    const { setNotes } = useNoteStore.getState()
    try {
        const res = await axiosInstance.get('/notes')
        setNotes(res.data.data.notes)
    } catch (err) {
        console.log("Error while fetching the notes", err);
    }
}

export async function getSpecificNote(id: string): Promise<Note | null> {
    try {
        const res = await axiosInstance.get(`/notes/${id}`);
        return res.data.data.note;
    } catch (err) {
        console.log("Error while fetching the notes", err);
        return null;
    }
}

export async function updateNote(note: Note | null) {
    try {
        const res = await axiosInstance.put(`/notes/${note?._id}`, note);
    } catch (err) {
        console.log("Error while fetching the notes", err);
    }
}