import NoteEditor from "@/pages/Notes/components/Editor";
import { getSpecificNote } from "@/services/notesApi";
import type { Note } from "@/types/note";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const NoteDetail = () => {
    const { id } = useParams();
    const [note, setNote] = useState<Note | null>(null)

    if (!id) {
        return <div>Error</div>
    }

    useEffect(() => {
        async function fetchNote(id: string) {
            try {
                const res = await getSpecificNote(id)
                setNote(res)
            } catch (error) {
                console.log(error);
            }
        }

        fetchNote(id)
    }, [id])

    return (
        <div className="p-4">
            <NoteEditor
                note={note}
                setNote={setNote}
            />
        </div>
    )
}

export default NoteDetail