// src/features/chatbot/index.js
//
// Public surface of the chatbot feature. Layouts only import ChatAssistant
// from here — never the individual components — so the feature boundary
// stays clean.

import ChatAssistant from "./components/ChatAssistant";

export { default as ChatAssistant } from "./components/ChatAssistant";
export { default as ChatLauncher } from "./components/ChatLauncher";
export { default as ChatWindow } from "./components/ChatWindow";

// Config re-exports — useful for callers that want to inspect model
// settings without reaching into config/ directly.
export { AI_MODEL, CHAT_SURFACE, ASSISTANT_PROFILE } from "./config/chatbot.config";

export default ChatAssistant;