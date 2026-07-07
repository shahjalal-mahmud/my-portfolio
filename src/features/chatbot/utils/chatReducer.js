// src/features/chatbot/utils/chatReducer.js
//
// Pure reducer for the chat surface. Co-located with the hook that owns it so
// the surface area is obvious. Kept dependency-free (no Immer) because the
// state is shallow and updates are small.
//
// Tagged-union actions are documented in `chat.types.js`.

import { CHAT_SURFACE } from "../config/chatbot.config";
import { createId } from "./id";

/**
 * Build the initial chat state.
 * @returns {import('../types/chat.types').ChatState}
 */
export function createInitialChatState() {
  return {
    isOpen: false,
    status: "idle",
    messages: [],
    error: null,
    conversationId: createId(),
    hasReceivedReply: false,
    suggestions: [],
    pendingInput: null,
  };
}

const MAX = CHAT_SURFACE.maxMessages;

/** @type {import('../types/chat.types').ChatState} */
const INITIAL = createInitialChatState();

/**
 * Pure reducer for the chat state.
 * @param {import('../types/chat.types').ChatState} state
 * @param {import('../types/chat.types').ChatAction} action
 * @returns {import('../types/chat.types').ChatState}
 */
export function chatReducer(state = INITIAL, action) {
  switch (action.type) {
    case "OPEN":
      return { ...state, isOpen: true };

    case "CLOSE":
      return { ...state, isOpen: false };

    case "TOGGLE":
      return { ...state, isOpen: !state.isOpen };

    case "SET_STATUS":
      return { ...state, status: action.status };

    case "SET_ERROR":
      return { ...state, status: "error", error: action.error };

    case "CLEAR_ERROR":
      return { ...state, error: null, status: state.status === "error" ? "idle" : state.status };

    case "APPEND_USER_MESSAGE": {
      const message = action.message;
      const messages = [...state.messages, message];
      return {
        ...state,
        messages: messages.length > MAX ? messages.slice(-MAX) : messages,
        status: "typing",
      };
    }

    case "APPEND_ASSISTANT_MESSAGE": {
      const messages = [...state.messages, action.message];
      return {
        ...state,
        messages: messages.length > MAX ? messages.slice(-MAX) : messages,
        status: "success",
        hasReceivedReply: true,
      };
    }

    case "UPDATE_MESSAGE": {
      const messages = state.messages.map((m) =>
        m.id === action.id ? { ...m, ...action.patch } : m
      );
      return { ...state, messages };
    }

    case "APPEND_TO_MESSAGE": {
      // Stream-friendly update: appends text to a single message's content.
      // Used by the chat hook to grow the assistant bubble token-by-token.
      const messages = state.messages.map((m) =>
        m.id === action.id
          ? { ...m, content: (m.content || "") + (action.text || "") }
          : m
      );
      return { ...state, messages };
    }

    case "REMOVE_MESSAGE":
      return { ...state, messages: state.messages.filter((m) => m.id !== action.id) };

    case "CLEAR":
      return { ...state, messages: [], status: "idle", error: null, hasReceivedReply: false };

    case "RESET": {
      const conversationId = action.conversationId || createId();
      return {
        ...createInitialChatState(),
        conversationId,
        isOpen: state.isOpen,
        suggestions: state.suggestions,
      };
    }

    case "SET_PENDING_INPUT":
      return { ...state, pendingInput: action.text };

    default:
      return state;
  }
}
