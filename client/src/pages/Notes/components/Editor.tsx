import { useAutoSave } from "@/hooks/autoSave";
import { updateNote } from "@/services/notesApi";
import type { Note } from "@/types/note";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from '@tiptap/extension-heading'
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { TextStyle } from "@tiptap/extension-text-style"
import Color from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import { useEffect } from "react";
import BubbleMenuBar from "./BubbleMenuBar";
import { NodeBlockExtension } from "@/extensions/nodeBlock";

export default function NoteEditor({ note, setNote }: { note: Note | null, setNote: React.Dispatch<React.SetStateAction<Note | null>> }) {
    const autoSave = useAutoSave(updateNote, 1200)
    const contentEditor = useEditor({
        extensions: [
            StarterKit.configure({
                paragraph: false,
                heading: false,
                bulletList: false,
            }),

            NodeBlockExtension, // <-- NOW WORKS

            TaskList,
            TaskItem.configure({ nested: false }),
            Heading.configure({ levels: [1, 2, 3] }),
            TextStyle,
            Color.configure({ types: ['textStyle'] }),
            Highlight.configure({ multicolor: true }),
        ],
        content: note?.content || "",
        autofocus: false,
        editorProps: {
            attributes: {
                class: "focus:outline-none max-w-none"
            }
        },
        onUpdate: ({ editor }) => {
            updateContent(editor.getHTML())
        },
    });

    const updateContent = (html: string) => {
        setNote(prev => {
            if (!prev) return prev;
            const updated = { ...prev, content: html };
            autoSave(updated);
            return updated;
        });
    };

    const updateTitle = (title: string) => {
        setNote(prev => {
            if (!prev) return prev;
            const updated = { ...prev, title };
            autoSave(updated);
            return updated;
        });
    };



    useEffect(() => {
        if (!contentEditor) return;
        if (note?.content == null) return;
        console.log(contentEditor?.extensionManager.extensions.map(e => e.name))

        if (contentEditor.getHTML() === note.content) return;
        contentEditor.commands.setContent(note.content);
    }, [contentEditor, note?.content]);


    return (
        <div className="w-full max-w-4xl mx-auto mt-10 px-4">

            <input
                type="text"
                value={note?.title || ""}
                onChange={(e) => {
                    setNote((prev) =>
                        prev ? { ...prev, title: e.target.value } : null
                    )
                    updateTitle(e.target.value)
                }
                }
                placeholder="New Page"
                className="w-full h-full text-4xl font-semibold outline-none pb-6 placeholder:text-gray-400"
            />

            <EditorContent editor={contentEditor} />
            <BubbleMenuBar editor={contentEditor} />
        </div>
    );
}
