import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { BlogDetail } from "@/features/blog/BlogDetail";
import { FALLBACK_BLOG_SLUGS } from "@/lib/blogSlugs";
import { fetchBlogPost, fetchBlogPosts } from "@/lib/serverApi";

interface Params {
  slug: string;
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  try {
    const posts = await fetchBlogPosts();
    if (posts.length > 0) {
      return posts.map((p) => ({ slug: p.slug }));
    }
  } catch {
    // Fall back to known slugs when the API is cold or unreachable at build time.
  }

  return FALLBACK_BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const post = await fetchBlogPost(params.slug);
  if (!post) {
    return buildPageMetadata({ title: "Post not found", path: "/blog" });
  }
  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.cover,
  });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const post = await fetchBlogPost(params.slug);
  if (!post) notFound();
  return <BlogDetail post={post} />;
}
