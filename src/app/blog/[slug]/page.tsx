import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { BlogDetail } from "@/features/blog/BlogDetail";
import { BLOG_POSTS } from "@/data/blogPosts";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
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

export default function BlogPostPage({ params }: { params: Params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();
  return <BlogDetail post={post} />;
}
