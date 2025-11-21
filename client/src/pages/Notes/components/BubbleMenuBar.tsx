import { Editor } from "@tiptap/react"
import { BubbleMenu } from '@tiptap/react/menus'
import { Bold, ChevronDown, Code, Italic, Strikethrough, Underline } from "lucide-react"
import { useState } from "react"
import ColorPellete from "./colorPellete"
import { useMyEditorState } from "@/hooks/editorState"
import TextOptions from "./TextOptions"

const BubbleMenuBar = ({ editor }: { editor: Editor }) => {
    const [up, setUp] = useState(false)
    const [textup, setTextup] = useState(false)
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

                <div className="px-1 py-1 rounded flex items-center cursor-pointer" onClick={() => setTextup(!textup)}>
                    <span className="px-1">Text</span>
                    <button>
                        <ChevronDown className="h-4 w-3" />
                    </button>
                </div>
                {textup && <TextOptions editor={editor} editorState={{ isParagraph: editorState.isParagraph, isHeading1: editorState.isHeading1, isHeading2: editorState.isHeading2, isHeading3: editorState.isHeading3, isBulletList: editorState.isBulletList, isOrderedList: editorState.isOrderedList, isTaskList: editorState.isTaskList, canToggleTaskList: editorState.canToggleTaskList }} />}


                {/* Bold */}
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editorState.canBold}
                    className={`px-2 py-1 rounded cursor-pointer ${editorState.isBold ? "bg-gray-200 font-bold" : ""
                        }`}
                >
                    <Bold className="w-4 h-4" />
                </button>

                {/* Italic */}
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editorState.canItalic}
                    className={`px-2 py-1 rounded cursor-pointer ${editorState.isItalic ? "bg-gray-200 italic" : ""
                        }`}
                >
                    <Italic className="w-4 h-4" />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={!editorState.canUnderline}
                    className={`px-2 py-1 rounded cursor-pointer ${editorState.isUnderline ? "bg-gray-200 italic" : ""
                        }`}
                >
                    <Underline className="w-4 h-4" />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editorState.canStrike}
                    className={`px-2 py-1 rounded cursor-pointer ${editorState.isStrike ? "bg-gray-200 italic" : ""
                        }`}
                >
                    <Strikethrough className="w-4 h-4" />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editorState.canCode}
                    className={`px-2 py-1 rounded cursor-pointer ${editorState.isCode ? "bg-gray-200 italic" : ""
                        }`}
                >
                    <Code className="w-4 h-4" />
                </button>
                <div className="px-2 py-1 rounded flex items-center cursor-pointer" onClick={() => setUp(!up)}>
                    <span className="hover:border px-1">A</span>
                    <button>
                        <ChevronDown className="h-4 w-4" />
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