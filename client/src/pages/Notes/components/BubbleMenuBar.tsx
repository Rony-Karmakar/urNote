import { Editor } from "@tiptap/react"
import { BubbleMenu } from '@tiptap/react/menus'
import { Bold, ChevronDown, ChevronUp, Code, Italic, Strikethrough, Underline } from "lucide-react"
import { useState } from "react"
import ColorPellete from "./colorPellete"
import { useMyEditorState } from "@/hooks/editorState"

const BubbleMenuBar = ({ editor }: { editor: Editor }) => {
    const [up, setUp] = useState(false)
    const editorState = useMyEditorState(editor)

    return (
        <BubbleMenu editor={editor}
            options={{
                placement: "left",
                offset: {
                    mainAxis: -30,
                    crossAxis: -40,
                }
            }}
        >
            <div className="flex gap-2 bg-white p-2 shadow rounded-lg border">

                {/* Bold */}
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editorState.canBold}
                    className={`px-2 py-1 rounded ${editorState.isBold ? "bg-gray-200 font-bold" : ""
                        }`}
                >
                    <Bold className="w-4 h-4" />
                </button>

                {/* Italic */}
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editorState.canItalic}
                    className={`px-2 py-1 rounded ${editorState.isItalic ? "bg-gray-200 italic" : ""
                        }`}
                >
                    <Italic className="w-4 h-4" />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={!editorState.canUnderline}
                    className={`px-2 py-1 rounded ${editorState.isUnderline ? "bg-gray-200 italic" : ""
                        }`}
                >
                    <Underline className="w-4 h-4" />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editorState.canStrike}
                    className={`px-2 py-1 rounded ${editorState.isStrike ? "bg-gray-200 italic" : ""
                        }`}
                >
                    <Strikethrough className="w-4 h-4" />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editorState.canCode}
                    className={`px-2 py-1 rounded ${editorState.isCode ? "bg-gray-200 italic" : ""
                        }`}
                >
                    <Code className="w-4 h-4" />
                </button>
                <div className="px-2 py-1 rounded flex">
                    <span className="hover:border px-2">A</span>
                    <button onClick={() => setUp(!up)}>
                        {up ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                    </button>
                </div>
                {up && <ColorPellete editor={editor} editorState={{ activeColor: editorState.activeColor, canSetColor: editorState.canSetColor, canUnsetColor: editorState.canUnsetColor, activeHighlight: editorState.activeHighlight, canSetHighlight: editorState.canSetHighlight, canUnsetHighlight: editorState.canUnsetHighlight }} />}

                <button
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}
                    className={`px-2 py-1`}
                >
                    Reset
                </button>
            </div>

        </BubbleMenu>
    )


}

export default BubbleMenuBar