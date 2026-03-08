"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ChatWindow.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const WELCOME_MESSAGE = {
  role: "assistant",
  content:
    "Hey! I'm Aqua AI, Oscar's AI assistant. Ask me anything about his work, skills, or projects!",
};

const ChatWindow = ({ closeWindow }) => {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const contentType = res.headers.get("content-type") || "";

      // Non-streaming response (validation error, rate limit, or off-topic redirect)
      if (contentType.includes("application/json")) {
        const data = await res.json();
        const msg = data.error || "Something went wrong. Please try again.";
        setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
        return;
      }

      // Streaming response — plain text stream
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        assistantContent += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantContent,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className={styles.cardContainer}>
      <div className={`card ${styles.chatCard}`}>
        <div className={`${styles.title} title`}>
          Aqua AI Assistant
          <button
            className={styles.closeBtn}
            onClick={() => closeWindow("chat")}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        </div>
        <div className={styles.line}></div>

        <div className={styles.messagesArea}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`${styles.message} ${
                msg.role === "user"
                  ? styles.userMessage
                  : styles.assistantMessage
              }`}
            >
              {msg.content}
            </div>
          ))}
          {isLoading && (
            <div
              className={`${styles.message} ${styles.assistantMessage} ${styles.typing}`}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className={styles.inputArea} onSubmit={sendMessage}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Oscar..."
            className={styles.input}
            disabled={isLoading}
            maxLength={500}
          />
          <button
            type="submit"
            className={styles.sendBtn}
            disabled={isLoading || !input.trim()}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
