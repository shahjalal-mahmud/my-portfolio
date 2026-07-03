// MobileNavBar — bottom NavigationBar with 4 destinations + center FAB.

import { FaHome, FaCode, FaUserGraduate, FaBriefcase } from "react-icons/fa";
import M3NavigationBar from "./components/M3NavigationBar";
import M3NavigationBarItem from "./components/M3NavigationBarItem";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import M3FAB from "./components/M3FAB";

export default function MobileNavBar() {
  const navigate = useNavigate();

  const left = (
    <>
      <M3NavigationBarItem to="/" end icon={<FaHome />} label="Home" />
      <M3NavigationBarItem
        to="/skills-projects"
        icon={<FaCode />}
        label="Skills"
      />
    </>
  );

  const right = (
    <>
      <M3NavigationBarItem
        to="/education-experience"
        icon={<FaUserGraduate />}
        label="Journey"
      />
      <M3NavigationBarItem
        to="/skills-projects#projects"
        icon={<FaBriefcase />}
        label="Projects"
      />
    </>
  );

  const fabSlot = (
    <div className="-mt-7">
      <M3FAB
        variant="filled"
        size="default"
        icon={<FaEnvelope className="text-xl" />}
        ariaLabel="Contact"
        onClick={() => navigate("/contact")}
      />
    </div>
  );

  return <M3NavigationBar left={left} right={right} fabSlot={fabSlot} />;
}