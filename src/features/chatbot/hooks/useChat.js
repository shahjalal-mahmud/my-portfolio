// src/features/chatbot/hooks/useChat.js
//
// Single hook that owns the entire chat-surface state. Built on useReducer
// to keep the logic pure and testable without a state library. The project
// currently has no Redux/Zustand/Recoil dependency, and adding one for a
// single chat surface would be over-engineering.
//
// Consumers (ChatWindow, etc.) receive:
//
//   {
//     state:       ChatState,
//     open,        () => void
//     close,       () => void
//     toggle,      () => void
//     sendMessage, (text: string) => Promise<void>
//     clear,       () => void
//     reset,       () => void
//   }
//
// On every state change the hook mirrors the transcript + conversation id to
// localStorage so users don't lose context on reload.
//
// PHASE 2: sendMessage now streams the assistant reply via the
// `onChunk` callback, patching the placeholder assistant bubble
// incrementally. Errors are mapped to friendly text via the service's
// `humanizeError()` rather than leaking raw SDK messages.

import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";

import {
  cancelRequest,
  clearConversation,
  humanizeError,
  initializeChat,
  sendMessage as sendToProvider,
} from "../services/aiService";
import {
  chatReducer,
  createInitialChatState,
} from "../utils/chatReducer";
import { createId } from "../utils/id";
import { readJSON, removeKey, writeJSON } from "../utils/storage";
import { CHAT_SURFACE } from "../config/chatbot.config";
import { getSuggestedQuestions } from "../data/suggestedQuestions";

/**
 * @returns {{
 *   state: import('../types/chat.types').ChatState,
 *   open: () => void,
 *   close: () => void,
 *   toggle: () => void,
 *   sendMessage: (text: string) => Promise<void>,
 *   clear: () => void,
 *   reset: () => void,
 *   isSending: boolean,
 * }}
 */
export function useChat() {
  // Hydrate from storage exactly once, otherwise start blank.
  const [state, dispatch] = useReducer(
    chatReducer,
    undefined,
    () => {
      const persistedMessages = CHAT_SURFACE.persistToStorage
        ? readJSON(CHAT_SURFACE.storageKey, [])
        : [];
      const persistedId = CHAT_SURFACE.persistToStorage
        ? readJSON(CHAT_SURFACE.conversationIdKey, null)
        : null;

      return {
        ...createInitialChatState(),
        conversationId: persistedId || createId(),
        messages: Array.isArray(persistedMessages) ? persistedMessages : [],
        hasReceivedReply: Array.isArray(persistedMessages) && persistedMessages.length > 0,
      };
    }
  );

  const lastRequestRef = useRef(0);
  // Per-request AbortController so cancelRequest() can abort an in-flight
  // stream without affecting future ones.
  const requestControllerRef = useRef(/** @type {AbortController | null} */ (null));

  // Initialise provider on mount + load suggestions.
  useEffect(() => {
    initializeChat().catch(() => {
      /* Surface swallows the typed error from a missing key. */
    });
    const suggestions = getSuggestedQuestions();
    if (suggestions.length > 0) {
      // Suggestions are static for Phase 2, but we dispatch so a future
      // dynamic source can feed them in without touching this file.
      dispatch({ type: "SET_PENDING_INPUT", text: state.pendingInput });
    }
    // Initialising exactly once is intentional.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist transcript on change.
  useEffect(() => {
    if (!CHAT_SURFACE.persistToStorage) return;
    writeJSON(CHAT_SURFACE.storageKey, state.messages);
  }, [state.messages]);

  // Persist conversation id on change.
  useEffect(() => {
    if (!CHAT_SURFACE.persistToStorage) return;
    if (state.conversationId) {
      writeJSON(CHAT_SURFACE.conversationIdKey, state.conversationId);
    }
  }, [state.conversationId]);

  const open = useCallback(() => dispatch({ type: "OPEN" }), []);
  const close = useCallback(() => dispatch({ type: "CLOSE" }), []);
  const toggle = useCallback(() => dispatch({ type: "TOGGLE" }), []);
  const clear = useCallback(() => {
    cancelRequest();
    if (requestControllerRef.current) {
      requestControllerRef.current.abort();
      requestControllerRef.current = null;
    }
    dispatch({ type: "CLEAR" });
    clearConversation(state.conversationId).catch(() => {});
    if (CHAT_SURFACE.persistToStorage) {
      removeKey(CHAT_SURFACE.storageKey);
    }
  }, [state.conversationId]);

  const reset = useCallback(() => {
    cancelRequest();
    if (requestControllerRef.current) {
      requestControllerRef.current.abort();
      requestControllerRef.current = null;
    }
    dispatch({ type: "RESET" });
    if (CHAT_SURFACE.persistToStorage) {
      removeKey(CHAT_SURFACE.storageKey);
    }
  }, []);

  /**
   * Send a user message. Adds it optimistically to the transcript, then
   * delegates to the provider service for the assistant reply.
   *
   * Phase 2: passes an `onChunk` callback to the service so the placeholder
   * assistant bubble grows in real time as tokens stream in. Errors are
   * translated to user-facing messages via `humanizeError`.
   *
   * @param {string} text
   */
  const sendMessage = useCallback(
    async (text) => {
      const trimmed = (text || "").trim();
      if (!trimmed) return;

      const requestId = ++lastRequestRef.current;
      const userMessageId = createId();
      const assistantMessageId = createId();

      dispatch({
        type: "APPEND_USER_MESSAGE",
        message: {
          id: userMessageId,
          role: "user",
          content: trimmed,
          timestamp: Date.now(),
          source: "user",
        },
      });

      // Insert a pending assistant placeholder so the typing indicator has
      // a target row to attach to while the first tokens arrive.
      dispatch({
        type: "APPEND_ASSISTANT_MESSAGE",
        message: {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          timestamp: Date.now(),
          pending: true,
          source: "assistant",
        },
      });

      const controller = new AbortController();
      requestControllerRef.current = controller;

      try {
        const reply = await sendToProvider(trimmed, {
          signal: controller.signal,
          onChunk: (piece) => {
            // Guard against stale streams — only patch if this is still
            // the active request. Uses APPEND_TO_MESSAGE so the assistant
            // bubble grows token-by-token without a read-modify-write race.
            if (requestId !== lastRequestRef.current) return;
            dispatch({
              type: "APPEND_TO_MESSAGE",
              id: assistantMessageId,
              text: piece,
            });
          },
        });
        if (requestId !== lastRequestRef.current) return;

        dispatch({
          type: "UPDATE_MESSAGE",
          id: assistantMessageId,
          patch: {
            content: reply.content,
            pending: false,
            suggestions: reply.suggestions,
          },
        });
        dispatch({ type: "SET_STATUS", status: "success" });
      } catch (err) {
        if (requestId !== lastRequestRef.current) return;

        const friendly = humanizeError(err);

        dispatch({
          type: "UPDATE_MESSAGE",
          id: assistantMessageId,
          patch: {
            content: friendly,
            pending: false,
            error: true,
          },
        });
        dispatch({ type: "SET_ERROR", error: friendly });
      } finally {
        if (requestControllerRef.current === controller) {
          requestControllerRef.current = null;
        }
      }
    },
    []
  );

  const isSending = state.status === "typing";

  const suggestions = useMemo(() => getSuggestedQuestions(), []);

  return {
    state: { ...state, suggestions },
    open,
    close,
    toggle,
    sendMessage,
    clear,
    reset,
    isSending,
  };
}

export default useChat;
