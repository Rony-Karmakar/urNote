import { useMyEditorState } from '@/hooks/editorState'
import { Editor } from '@tiptap/react'

type editorColorState = Pick<ReturnType<typeof useMyEditorState>, "activeColor" | "canSetColor" | "canUnsetColor" | "activeHighlight" | "canSetHighlight" | "canUnsetHighlight">

const ColorPellete = ({ editorState, editor }: { editorState: editorColorState, editor: Editor }) => {
    return (
        <div className="flex gap-2 items-center">

            {/* Color Palette */}
            <div className="flex gap-1">
                {["#ff0000", "#00bcd4", "#4caf50", "#ff9800", "#9c27b0"].map((color) => (
                    <button
                        key={color}
                        disabled={!editorState.canSetColor}
                        onClick={() => editor.chain().focus().setColor(color).run()}
                        className={`w-5 h-5 rounded-full ${editorState.activeColor === color ? "ring-2 ring-black" : ""}`}
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>

            {/* Clear Color */}
            <button
                disabled={!editorState.canUnsetColor}
                onClick={() => editor.chain().focus().unsetColor().run()}
                className="px-2 py-1 bg-white hover:bg-gray-100"
            >
                Clear
            </button>
            <div className="flex gap-1 items-center justify-center">
                {["#ffff00", "#ffeb3b", "#ffcccb", "#b3e5fc", "#c8e6c9"].map((color) => (
                    <button
                        key={color}
                        disabled={!editorState.canSetHighlight}
                        onClick={() =>
                            editor.chain().focus().setHighlight({ color }).run()
                        }
                        className={`w-5 h-5 ${editorState.activeHighlight === color ? "ring-2 ring-black" : ""}`}
                        style={{ backgroundColor: color }}
                    />
                ))}

                <button
                    disabled={!editorState.canUnsetHighlight}
                    onClick={() => editor.chain().focus().unsetHighlight().run()}
                    className="px-2 py-1"
                >
                    Clear
                </button>
            </div>
        </div>
    )
}

export default ColorPellete