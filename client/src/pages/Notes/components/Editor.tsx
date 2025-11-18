import { useAutoSave } from "@/hooks/autoSave";
import { updateNote } from "@/services/notesApi";
import type { Note } from "@/types/note";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

export default function NoteEditor({ note, setNote }: { note: Note | null, setNote: React.Dispatch<React.SetStateAction<Note | null>> }) {
    const autoSave = useAutoSave(updateNote, 1200)
    const contentEditor = useEditor({
        extensions: [
            StarterKit.configure({
                paragraph: {
                    HTMLAttributes: {
                        style: "white-space: pre-wrap;",
                    },
                },
            }),

        ],
        content: note?.content || "",
        autofocus: false,
        editorProps: {
            attributes: {
                class: "focus:outline-none max-w-none"
            }
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            handleChange(html)

        },
    });

    const handleChange = (html = note?.content) => {
        setNote((prev) =>
            prev ? { ...prev, content: html } : null
        );
        autoSave(note)
    }

    useEffect(() => {
        if (!contentEditor) return;
        if (note?.content == null) return;

        if (contentEditor.getHTML() === note.content) return;
        contentEditor.commands.setContent(note.content);
    }, [contentEditor, note?.content]);


    return (
        <div className="w-full max-w-4xl mx-auto mt-10 px-4">

            <input
                type="text"
                value={note?.title || ""}
                onChange={(e) =>
                    setNote((prev) =>
                        prev ? { ...prev, title: e.target.value } : null
                    )
                }
                placeholder="New Page"
                className="w-full h-full text-4xl font-semibold outline-none pb-6 placeholder:text-gray-400"
            />

            <EditorContent editor={contentEditor} />
        </div>
    );
}
