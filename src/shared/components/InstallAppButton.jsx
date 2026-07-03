// Renders an "Install app" button whenever the browser has fired
// beforeinstallprompt. Renders nothing once the app is installed.
//
// `variant="mobile"` uses M3 styling (filled tonal, rounded-full).
// `variant="desktop"` uses a DaisyUI button styled to match Navbar.

import { Download } from "lucide-react";
import { toast } from "react-toastify";
import { useInstallPrompt } from "../hooks/useInstallPrompt";

export default function InstallAppButton({ variant = "desktop", className = "" }) {
  const { supported, installed, promptInstall } = useInstallPrompt();

  if (installed || !supported) return null;

  const onClick = async () => {
    const outcome = await promptInstall();
    if (outcome === "accepted") {
      toast.success("App installed. Launching from your home screen next time.", {
        autoClose: 2500,
        theme: "colored",
      });
    }
  };

  if (variant === "mobile") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={
          "m3-state-hover inline-flex items-center justify-center gap-2 " +
          "h-12 px-5 rounded-full bg-primary-container text-on-primary-container " +
          "font-medium text-sm tracking-wide select-none " +
          className
        }
        aria-label="Install app"
      >
        <Download size={18} />
        <span>Install app</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "btn btn-sm btn-outline btn-primary gap-2 normal-case " + className
      }
      aria-label="Install app"
    >
      <Download size={16} />
      <span>Install</span>
    </button>
  );
}