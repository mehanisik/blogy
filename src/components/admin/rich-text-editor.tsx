import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import clsx from "clsx";
import React from "react";
import {
  FaBold,
  FaCode,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteRight,
  FaRedo,
  FaStrikethrough,
  FaUndo,
} from "react-icons/fa";
import { Markdown } from "tiptap-markdown";

interface RichTextEditorProps {
  content: string;
  onChange?: (markdown: string) => void;
  editable?: boolean;
  name?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const buttons = [
    {
      id: "bold",
      icon: <FaBold />,
      title: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      id: "italic",
      icon: <FaItalic />,
      title: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      id: "strike",
      icon: <FaStrikethrough />,
      title: "Strike",
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
    },
    {
      id: "code",
      icon: <FaCode />,
      title: "Code",
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive("code"),
    },
    {
      id: "divider-1",
      type: "divider",
    },
    {
      id: "h1",
      icon: <FaHeading className="text-xs" />,
      title: "H1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      id: "h2",
      icon: <FaHeading className="text-sm" />,
      title: "H2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      id: "h3",
      icon: <FaHeading className="text-lg" />,
      title: "H3",
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
    },
    {
      id: "divider-2",
      type: "divider",
    },
    {
      id: "bullet-list",
      icon: <FaListUl />,
      title: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      id: "ordered-list",
      icon: <FaListOl />,
      title: "Ordered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
    {
      id: "blockquote",
      icon: <FaQuoteRight />,
      title: "Blockquote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
    },
    {
      id: "divider-3",
      type: "divider",
    },
    {
      id: "undo",
      icon: <FaUndo />,
      title: "Undo",
      action: () => editor.chain().focus().undo().run(),
      disabled: !editor.can().undo(),
    },
    {
      id: "redo",
      icon: <FaRedo />,
      title: "Redo",
      action: () => editor.chain().focus().redo().run(),
      disabled: !editor.can().redo(),
    },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] sticky top-0 z-10">
      {buttons.map((btn) =>
        btn.type === "divider" ? (
          <div
            key={btn.id}
            className="w-px h-6 bg-[var(--border-color)] mx-1 self-center"
          />
        ) : (
          <button
            key={btn.id}
            onClick={(e) => {
              e.preventDefault();

              btn.action?.();
            }}
            disabled={btn.disabled}
            className={clsx(
              "p-2 rounded hover:bg-[var(--bg)] transition-colors text-[var(--text-secondary)]",

              btn.isActive &&
                "bg-[var(--accent-color)] text-white hover:bg-[var(--accent-color)]",

              btn.disabled &&
                "opacity-50 cursor-not-allowed hover:bg-transparent",
            )}
            title={btn.title}
            type="button"
          >
            {}
            {btn.icon}
          </button>
        ),
      )}
    </div>
  );
};

export default function RichTextEditor({
  content: initialContent,
  onChange,
  editable = true,
  name,
}: RichTextEditorProps) {
  const [content, setContent] = React.useState(initialContent);

  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    content: initialContent,
    editable,
    editorProps: {
      attributes: {
        class: clsx(
          "prose prose-invert max-w-none focus:outline-none",
          editable ? "min-h-[500px] p-4" : "p-0",
        ),
      },
    },
    onUpdate: ({ editor }) => {
      
      const markdown = (editor.storage as any).markdown.getMarkdown();
      setContent(markdown);
      onChange?.(markdown);
    },
  });

  return (
    <div
      className={clsx(
        "w-full rounded-none overflow-hidden transition-colors",
        editable
          ? "border border-[var(--border-color)] bg-[var(--bg-secondary)] focus-within:border-[var(--accent-color)]"
          : "bg-transparent",
      )}
    >
      {editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
      {name && <input type="hidden" name={name} value={content} />}
    </div>
  );
}
