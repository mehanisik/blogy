import clsx from "clsx";
import React from "react";

interface RichTextEditorProps {
  content: string;
  onChange?: (markdown: string) => void;
  editable?: boolean;
  name?: string;
}

export default function RichTextEditor({
  content: initialContent,
  onChange,
  editable = true,
  name,
}: RichTextEditorProps) {
  const [content, setContent] = React.useState(initialContent);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setContent(newValue);
    onChange?.(newValue);
  };

  if (!editable) {
    // This should ideally not be used anymore as we use native rendering,
    // but kept for safety if used elsewhere in read-only mode.
    return <div className="prose prose-invert max-w-none">{content}</div>;
  }

  return (
    <div
      className={clsx(
        "w-full rounded-none overflow-hidden transition-colors",
        "border border-[var(--border-color)] bg-[var(--bg-secondary)] focus-within:border-[var(--accent-color)]",
      )}
    >
      <textarea
        value={content}
        onChange={handleChange}
        name={name}
        className="w-full h-[500px] p-4 bg-transparent border-none focus:outline-none resize-none font-mono text-sm"
        placeholder="Write your markdown here..."
      />
    </div>
  );
}
