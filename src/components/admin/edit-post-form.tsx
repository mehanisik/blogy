import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import RichTextEditor from "./rich-text-editor";

export default function EditPostForm() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [postId, setPostId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    cover_image: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");

      if (!id) {
        window.location.href = "/admin";
        return;
      }

      setPostId(Number.parseInt(id, 10));

      try {
        const { data: post, error } = await supabase
          .from("writings")
          .select("*")
          .eq("id", Number.parseInt(id, 10))
          .single();

        if (error) throw error;
        if (!post) throw new Error("Post not found");

        setFormData({
          title: post.title,
          slug: post.slug || "",
          description: post.description || "",
          content: post.content || "",
          cover_image: post.cover_image || "",
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      if (name === "title" && !prev.slug) {
        newData.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
      }

      return newData;
    });
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      console.log("Updating post...", formData);
      const { error } = await supabase
        .from("writings")
        .update({
          title: formData.title,
          slug: formData.slug,
          description: formData.description || null,
          content: formData.content,
          cover_image: formData.cover_image || null,
          metadata: {
            read_time: String(
              Math.ceil(formData.content.split(" ").length / 200),
            ),
          },
        })
        .eq("id", postId as number);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/admin";
      }, 1500);
    } catch (err: unknown) {
      console.error("Error updating post:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--text-tertiary)] font-mono">
          Loading post data...
        </p>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-mono">Error: {error}</p>
        <a
          href="/admin"
          className="text-sm font-mono text-[var(--text-tertiary)] hover:text-[var(--accent-color)] mt-4 inline-block"
        >
          ← Back to Dashboard
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)] transition-colors rounded-none"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="slug"
            className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]"
          >
            Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)] transition-colors rounded-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)] transition-colors rounded-none resize-none"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="cover_image"
          className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]"
        >
          Cover Image URL
        </label>
        <input
          type="url"
          id="cover_image"
          name="cover_image"
          value={formData.cover_image}
          onChange={handleInputChange}
          placeholder="https://..."
          className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-color)] transition-colors rounded-none"
        />
      </div>

      <div className="space-y-2">
        <span className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
          Content
        </span>
        <RichTextEditor
          content={formData.content}
          onChange={handleContentChange}
          name="content"
        />
      </div>

      {error && (
        <div className="text-sm text-red-500 font-mono">Error: {error}</div>
      )}

      {success && (
        <div className="text-sm text-green-500 font-mono">
          Post updated successfully! Redirecting...
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-[var(--border-color)]">
        <button
          type="submit"
          className="px-8 py-4 bg-[var(--accent-color)] text-white font-mono text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
        >
          Update Post
        </button>
      </div>
    </form>
  );
}
