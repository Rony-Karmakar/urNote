import { useMyEditorState } from '@/hooks/editorState'
import { Editor } from '@tiptap/react'

type editorColorState = Pick<ReturnType<typeof useMyEditorState>, "activeColor" | "canSetColor" | "canUnsetColor" | "activeHighlight" | "canSetHighlight" | "canUnsetHighlight">

const ColorPellete = ({ editorState, editor }: { editorState: editorColorState, editor: Editor }) => {
    return (
        <div className="absolute flex flex-col gap-2 items-start py-2 px-6 bg-neutral-100 top-13 right-1 rounded-sm">

            {/* Color Palette */}
            <div className='text-xs text-neutral-600 font-bold'>Text Color</div>
            <div className="grid grid-cols-5 gap-3">
                {[
                    "#ff0000", "#00bcd4", "#4caf50", "#ff9800", "#9c27b0", "#e91e63", "#3f51b5", "#795548", "#607d8b", "#000000",
                ].map((color) => (
                    <button
                        key={color}
                        disabled={!editorState.canSetColor}
                        onClick={() => editor.chain().focus().setColor(color).run()}
                        className={`w-6 h-6 ${editorState.activeColor === color ? "ring-2 ring-black" : ""
                            }`}
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>

            {/* Clear Color */}
            <button
                disabled={!editorState.canUnsetColor}
                onClick={() => editor.chain().focus().unsetColor().run()}
                className="text-xs px-2 py-1"
            >
                Clear
            </button>

            <div className='text-xs text-neutral-600 font-bold'>Background Color</div>
            <div className="grid grid-cols-5 gap-3">
                {[
                    "#ff0000", "#00bcd4", "#4caf50", "#ff9800", "#9c27b0", "#e91e63", "#3f51b5", "#795548", "#607d8b", "#000000",
                ].map((color) => (
                    <button
                        key={color}
                        disabled={!editorState.canSetHighlight}
                        onClick={() => editor.chain().focus().setHighlight({ color }).run()}
                        className={`w-6 h-6  ${editorState.activeHighlight === color ? "ring-2 ring-black" : ""}`}
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>
            <button
                disabled={!editorState.canUnsetHighlight}
                onClick={() => editor.chain().focus().unsetHighlight().run()}
                className="text-xs px-2 py-1"
            >
                Clear
            </button>
        </div>
    )
}

export default ColorPellete