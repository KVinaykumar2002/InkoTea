import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { BlogDetail } from "@/features/blog/BlogDetail";
import { fetchBlogPost, fetchBlogPosts } from "@/lib/serverApi";

export const dynamic = "force-dynamic";

interface Params {
  slug: string;
}

export async function generateStaticParams(): Promise<Params[]> {
  try {
    const posts = await fetchBlogPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
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
