import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

export default function Block() {
    return (
        <NodeViewWrapper className="block relative group py-1">
            {/* Hover menu */}
            <div className="absolute -left-8 top-1 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button className="text-gray-500 hover:text-black">⋮⋮</button>
                <button className="text-gray-500 hover:text-black">+</button>
            </div>

            {/* Editable block content */}
            <NodeViewContent className="block-content" />
        </NodeViewWrapper>
    );
}
