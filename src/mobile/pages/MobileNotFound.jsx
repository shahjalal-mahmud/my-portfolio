// MobileNotFound — simple 404 page styled with M3 Empty State.

import { Link } from "react-router-dom";
import { FaHome, FaCompass } from "react-icons/fa";
import M3EmptyState from "../components/M3EmptyState";
import M3Button from "../components/M3Button";

export default function MobileNotFound() {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-6 pt-14 pb-16">
      <M3EmptyState
        icon={<FaCompass />}
        title="Page not found"
        subtitle="The link you followed may be broken, or the page may have been removed."
        action={
          <Link to="/">
            <M3Button variant="filled" icon={<FaHome />}>
              Back to Home
            </M3Button>
          </Link>
        }
      />
    </div>
  );
}