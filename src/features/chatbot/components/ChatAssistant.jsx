// src/features/chatbot/components/ChatAssistant.jsx
//
// Composite surface that owns open state and renders both the launcher and
// the window. Designed to be mounted once at the layout root, identical to
// how OfflineBanner / InstallAppButton are mounted.

import { useState } from "react";

import ChatLauncher from "./ChatLauncher";
import ChatWindow from "./ChatWindow";

export function ChatAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ChatLauncher open={open} onToggle={() => setOpen((v) => !v)} />
      <ChatWindow open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default ChatAssistant;
