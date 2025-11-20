import { useMyEditorState } from '@/hooks/editorState'
import { Editor } from '@tiptap/react'
import { Heading1, Heading2, Heading3, List, ListOrdered, Type } from 'lucide-react'


type editorColorState = Pick<ReturnType<typeof useMyEditorState>, "isParagraph" | "isHeading1" | "isHeading2" | "isHeading3" | "isBulletList" | "isOrderedList">

const TextOptions = ({ editorState, editor }: { editorState: editorColorState, editor: Editor }) => {
    return (
        <div className="absolute w-37 grid grid-cols-1 gap-2 items-start py-2 px-2 bg-neutral-100 top-13 right-63 rounded-sm">
            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={`max-w-full px-2 py-1 rounded flex items-center ${editorState.isParagraph ? "bg-gray-300 text-black font-semibold" : "hover:bg-gray-200"}`}
            >
                <Type className='w-5 h-5' /> <span className='text-xs pl-2'>Text</span>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`px-2 py-1 rounded flex items-center ${editorState.isHeading1 ? "bg-gray-300 text-black font-semibold" : "hover:bg-gray-200"}`}
            >
                <Heading1 className='w-5 h-5' /> <span className='text-xs pl-2'>Heading1</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`px-2 py-1 rounded flex items-center ${editorState.isHeading2 ? "bg-gray-300 text-black font-semibold" : "hover:bg-gray-200"}`}
            >
                <Heading2 className='w-5 h-5' /> <span className='text-xs pl-2'>Heading2</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`px-2 py-1 rounded flex items-center ${editorState.isHeading3 ? "bg-gray-300 text-black font-semibold" : "hover:bg-gray-200"}`}
            >
                <Heading3 className='w-5 h-5' /> <span className='text-xs pl-2'>Heading3</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`px-2 py-1 rounded flex items-center ${editorState.isBulletList ? "bg-gray-300 text-black font-semibold" : "hover:bg-gray-200"}`}
            >
                <List className='w-5 h-5' /><span className='text-xs pl-2'>Bulleted List</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`px-2 py-1 rounded flex items-center ${editorState.isOrderedList ? "bg-gray-300 text-black font-semibold" : "hover:bg-gray-200"}`}
            >
                <ListOrdered className='w-5 h-5' /><span className='text-xs pl-2'>Numbered List</span>
            </button>
        </div>
    )
}

export default TextOptions