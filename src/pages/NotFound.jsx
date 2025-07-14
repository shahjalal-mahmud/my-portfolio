import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-300 text-center px-6">
      <div className="max-w-3xl w-full space-y-8">
        {/* Animated Illustration */}
        <div className="flex justify-center">
          <img
            src="/public/img/Oops.png"
            alt="Lost in space"
            className="w-72 md:w-96 animate-float"
          />
        </div>

        <h1 className="text-5xl font-extrabold text-primary drop-shadow-lg" data-aos="fade-down">
          404 - Page Not Found
        </h1>

        <p className="text-lg text-gray-500 dark:text-gray-300 max-w-xl mx-auto" data-aos="fade-up">
          Oops! It looks like you’re lost in space. The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div data-aos="zoom-in">
          <Link to="/" className="btn btn-primary gap-2">
            <FaArrowLeft />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
