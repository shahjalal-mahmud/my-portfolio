// src/pages/Blog.jsx
import blogData from "../data/blogData.json";
import BlogCard from "../components/BlogCard";

const Blog = () => {
  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6 text-primary">My Blog</h1>
      <p className="mb-10 text-base-content/70">
        Sharing my thoughts, tools, professional updates, and project docs.
      </p>

      <div className="space-y-8">
        {blogData.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
