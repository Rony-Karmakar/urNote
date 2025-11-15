import { create } from "zustand"
import type { Note } from "@/types/note"

type NoteState = {
    notes: Note[],
    setNotes: (note: Note[]) => void
}

export const useNoteStore = create<NoteState>((set) => ({
    notes: [],
    setNotes: (notes) => set({ notes })
}))