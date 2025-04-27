import supabase from "@/db";

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPost extends Post {
  tags: Tag[];
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*');  
  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
  
  // Fetch tags for each post
  const postsWithTags: BlogPost[] = [];
  
  for (const post of posts) {
    const { data: postTags } = await supabase
      .from('posts_tags')
      .select('tags(*)')
      .eq('post_id', post.id);
    
    postsWithTags.push({
      ...post,
      tags: postTags?.map(pt => pt.tags) || []
    });
  }
  
  return postsWithTags;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error || !post) {
    console.error('Error fetching post:', error);
    return undefined;
  }
  
  // Fetch tags for the post
  const { data: postTags } = await supabase
    .from('posts_tags')
    .select('tags(*)')
    .eq('post_id', post.id);
  
  return {
    ...post,
    tags: postTags?.map(pt => pt.tags) || []
  };
}

export async function getPostsByTag(tagSlug: string): Promise<BlogPost[]> {
  // First get the tag
  const { data: tag, error: tagError } = await supabase
    .from('tags')
    .select('*')
    .eq('slug', tagSlug)
    .single();
  
  if (tagError || !tag) {
    console.error('Error fetching tag:', tagError);
    return [];
  }
  
  // Get post IDs that have this tag
  const { data: postTags, error: postTagsError } = await supabase
    .from('posts_tags')
    .select('post_id')
    .eq('tag_id', tag.id);
  
  if (postTagsError || !postTags || postTags.length === 0) {
    return [];
  }
  
  const postIds = postTags.map(pt => pt.post_id);
  
  // Get the posts
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('*')
    .in('id', postIds)
    .order('published_at', { ascending: false });
  
  if (postsError || !posts) {
    console.error('Error fetching posts:', postsError);
    return [];
  }
  
  // Fetch tags for each post
  const postsWithTags: BlogPost[] = [];
  
  for (const post of posts) {
    const { data: tags } = await supabase
      .from('posts_tags')
      .select('tags(*)')
      .eq('post_id', post.id);
    
    postsWithTags.push({
      ...post,
      tags: tags?.map(t => t.tags) || []
    });
  }
  
  return postsWithTags;
}

export async function getAllTags(): Promise<Tag[]> {
  const { data: tags, error } = await supabase
    .from('tags')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
  
  return tags;
}
