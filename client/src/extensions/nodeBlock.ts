import Paragraph from "@tiptap/extension-paragraph";
import { ReactNodeViewRenderer } from "@tiptap/react";
import Block from "@/components/Block";

export const NodeBlockExtension = Paragraph.extend({
  name: "paragraph",   // <-- THIS IS IMPORTANT!
  // It overrides the default paragraph node.

  addNodeView() {
    return ReactNodeViewRenderer(Block);
  },
});
