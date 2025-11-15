import { axiosInstance } from "@/lib/axios";
import { useNoteStore } from "@/store/noteStore";

export async function getNotes() {
    const { setNotes } = useNoteStore.getState()
    try {
        const res = await axiosInstance.get('/notes')
        setNotes(res.data.data.notes)
    } catch (err) {
        console.log("Error while fetching the notes", err);
    }
}

export async function getSpecificNote(id: string) {
    try {
        const res = await axiosInstance.get(`/notes/${id}`);
        console.log(res.data.data.note);
        return res.data.data.note;
    } catch (err) {
        console.log("Error while fetching the notes", err);
        return null;
    }
}