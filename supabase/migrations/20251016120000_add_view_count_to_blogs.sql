-- Add view_count to blogs table
ALTER TABLE public.blogs
ADD COLUMN view_count INT DEFAULT 0;

-- Function to increment blog view count
CREATE OR REPLACE FUNCTION increment_blog_view(blog_slug TEXT)
RETURNS void AS $$
  UPDATE public.blogs
  SET view_count = view_count + 1
  WHERE slug = blog_slug;
$$ LANGUAGE sql SECURITY DEFINER;
