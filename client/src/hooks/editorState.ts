import { useEditorState } from "@tiptap/react";
import { Editor } from "@tiptap/react";

export function useMyEditorState(editor: Editor) {
    return useEditorState({
        editor,
        selector: (ctx) => {
            const attrs = ctx.editor.getAttributes("textStyle");
            const highlightAttrs = ctx.editor.getAttributes("highlight");

            return {
                // MARKS
                isBold: ctx.editor.isActive("bold") ?? false,
                canBold: ctx.editor.can().chain().toggleBold().run() ?? false,

                isItalic: ctx.editor.isActive("italic") ?? false,
                canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,

                isStrike: ctx.editor.isActive("strike") ?? false,
                canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,

                isUnderline: ctx.editor.isActive("underline") ?? false,
                canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,

                isCode: ctx.editor.isActive("code") ?? false,
                canCode: ctx.editor.can().chain().toggleCode().run() ?? false,

                canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,

                // TEXT COLOR
                activeColor: attrs?.color || null,
                canSetColor: ctx.editor.can().chain().setColor("#ff0000").run() ?? false,
                canUnsetColor: ctx.editor.can().chain().unsetColor().run() ?? false,

                // HIGHLIGHT
                activeHighlight: highlightAttrs?.color || null,
                canSetHighlight: ctx.editor
                    .can()
                    .chain()
                    .setHighlight({ color: "#ffff00" })
                    .run() ?? false,
                canUnsetHighlight: ctx.editor.can().chain().unsetHighlight().run() ?? false,

                // FONT SIZE
                activeFontSize: attrs?.fontSize || null,
                canSetFontSize: ctx.editor.can().chain().setMark("textStyle", { fontSize: "20px" }).run() ?? false,

                // NODES
                isParagraph: ctx.editor.isActive("paragraph") ?? false,

                isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
                isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
                isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
                isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
                isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
                isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,

                isBulletList: ctx.editor.isActive("bulletList") ?? false,
                isOrderedList: ctx.editor.isActive("orderedList") ?? false,

                isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
                isBlockquote: ctx.editor.isActive("blockquote") ?? false,

                isTaskList: ctx.editor.isActive("taskList") ?? false,
                canToggleTaskList: ctx.editor.can().chain().toggleTaskList().run() ?? false,

                // HISTORY
                canUndo: ctx.editor.can().chain().undo().run() ?? false,
                canRedo: ctx.editor.can().chain().redo().run() ?? false,
            };
        },
    });
}
