import React, { useState } from "react";
import { ChatService } from "../../../Service/ChatService";

const ChatBot = ({ closeModal }) => {
  const [message, setMessage] = useState("");
  const [dataMessage, setDataMessage] = useState([
    {
      owner: "bot",
      message: "How can I help you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return; // Prevent sending empty messages

    try {
      // Add user message to chat
      const dataUser = {
        owner: "person",
        message: message,
      };
      setDataMessage((prev) => [...prev, dataUser]);
      setMessage(""); // Clear input
      setIsLoading(true);

      // Call API
      const res = await ChatService.generateChat(message);

      // Add bot response to chat
      const dataChat = {
        owner: "bot",
        message: res,
      };
      setDataMessage((prev) => [...prev, dataChat]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Optionally add error message to chat
      setDataMessage((prev) => [
        ...prev,
        {
          owner: "bot",
          message: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full h-[500px]">
      <div className="w-full border flex flex-col rounded-t-xl h-full">
        {/* Header */}
        <header className="w-full bg-blue-500 flex justify-between px-2 py-1 rounded-t-lg items-center">
          <h2 className="text-sm font-semibold text-white flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 2048 2048"
              className="text-white"
            >
              <path
                fill="currentColor"
                d="M768 1024H640V896h128zm512 0h-128V896h128zm512-128v256h-128v320q0 40-15 75t-41 61t-61 41t-75 15h-264l-440 376v-376H448q-40 0-75-15t-61-41t-41-61t-15-75v-320H128V896h128V704q0-40 15-75t41-61t61-41t75-15h448V303q-29-17-46-47t-18-64q0-27 10-50t27-40t41-28t50-10q27 0 50 10t40 27t28 41t10 50q0 34-17 64t-47 47v209h448q40 0 75 15t61 41t41 61t15 75v192zm-256-192q0-26-19-45t-45-19H448q-26 0-45 19t-19 45v768q0 26 19 45t45 19h448v226l264-226h312q26 0 45-19t19-45zm-851 462q55 55 126 84t149 30q78 0 149-29t126-85l90 91q-73 73-167 112t-198 39q-103 0-197-39t-168-112z"
              />
            </svg>
            Chatbot
          </h2>
          <span
            className="text-white aspect-square w-8 cursor-pointer p-1"
            onClick={closeModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path
                fill="currentColor"
                d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12L5.293 6.707a1 1 0 0 1 0-1.414"
              />
            </svg>
          </span>
        </header>
        <div className="flex flex-col justify-between h-full">
          {/* Chat content */}
          <div className="flex flex-col gap-4 p-2 select-none overflow-y-auto max-h-[80%]">
            {dataMessage.map((item, index) => (
              <div
                key={index}
                className={
                  item.owner === "bot"
                    ? "flex items-end"
                    : "flex items-end flex-row-reverse"
                }
              >
                <div className="rounded bg-blue-500 w-8 aspect-square p-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="text-white"
                  >
                    <path
                      fill="currentColor"
                      d={
                        item.owner === "bot"
                          ? "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                          : "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                      }
                    />
                  </svg>
                </div>
                <p className="mx-2 p-2 rounded bg-gray-200 leading-4 text-sm">
                  {item.message}
                </p>
              </div>
            ))}
          </div>

          {/* Input and send button */}
          <div className="flex items-center justify-center my-2 mx-1">
            <textarea
              id="chat"
              rows="1"
              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
            ></textarea>
            <button
              onClick={handleSendMessage}
              type="submit"
              className="flex justify-center items-center aspect-square h-9 bg-blue-500 p-2 text-white rounded-full cursor-pointer hover:bg-blue-600 disabled:bg-blue-300"
              disabled={isLoading || !message.trim()}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.818 3.146 7.955l2.854-2.664z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path
                    fill="currentColor"
                    d="M2.01 21L23 12L2.01 3V10L17 12L2.01 14V21Z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;