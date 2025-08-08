import { useState } from "react";
import { FaRegThumbsUp, FaRegCommentDots, FaShare } from "react-icons/fa";
import emailjs from "emailjs-com";

const BlogCard = ({ post }) => {
  const [comment, setComment] = useState({ name: "", email: "", message: "" });
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [status, setStatus] = useState("");
  const [toast, setToast] = useState(null);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name: comment.name,
      email: comment.email,
      message: comment.message,
      postTitle: post.title,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then(() => {
        setToast({ type: "success", message: "Thank you! Your comment has been sent." });
        setComment({ name: "", email: "", message: "" });
        setStatus("");
        setShowCommentForm(false);
        setTimeout(() => setToast(null), 3000);
      })
      .catch(() => {
        setToast({ type: "error", message: "Something went wrong. Try again later." });
        setTimeout(() => setToast(null), 3000);
      });
  };

  return (
    <div className="w-full bg-base-100 shadow-md rounded-lg p-6 mb-6 space-y-4">
      {/* Toast */}
      {toast && (
        <div className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"} shadow-lg mb-4`}>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <img
            src={post.author.profileImage}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-base-content">{post.author.name}</h3>
            <p className="text-sm text-base-content/70">{post.author.title}</p>
          </div>
        </div>
        <div className="text-sm text-base-content/60">
          {new Date(post.date).toLocaleDateString()}
        </div>
      </div>

      {/* Caption */}
      <p className="text-base text-base-content">{post.caption}</p>

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-md object-cover max-h-[500px]"
        />
      )}

      {/* Content */}
      <p className="text-base text-base-content/80 whitespace-pre-line">{post.content}</p>

      {/* Buttons */}
      <div className="flex justify-around border-t border-base-200 pt-4 text-base-content/70">
        <button className="flex items-center gap-2 hover:text-primary transition">
          <FaRegThumbsUp /> Like
        </button>
        <button
          className="flex items-center gap-2 hover:text-primary transition"
          onClick={() => setShowCommentForm(!showCommentForm)}
        >
          <FaRegCommentDots /> Comment
        </button>
        <button
          className="flex items-center gap-2 hover:text-primary transition"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href + `#${post.id}`);
            setToast({ type: "success", message: "Post link copied!" });
            setTimeout(() => setToast(null), 3000);
          }}
        >
          <FaShare /> Share
        </button>
      </div>

      {/* Conditional Comment Form */}
      {showCommentForm && (
        <div className="mt-6 border-t border-base-200 pt-4">
          <h4 className="font-bold mb-2 text-base-content">Leave a Comment</h4>
          <form onSubmit={handleCommentSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={comment.name}
              onChange={(e) => setComment({ ...comment, name: e.target.value })}
              required
              className="input input-bordered w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={comment.email}
              onChange={(e) => setComment({ ...comment, email: e.target.value })}
              required
              className="input input-bordered w-full"
            />
            <textarea
              name="message"
              placeholder="Your Comment"
              value={comment.message}
              onChange={(e) => setComment({ ...comment, message: e.target.value })}
              required
              className="textarea textarea-bordered w-full"
              rows="4"
            ></textarea>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
