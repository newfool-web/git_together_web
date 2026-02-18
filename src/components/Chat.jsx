import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [limit] = useState(20);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const chatContainerRef = useRef(null);
  const initialScrollDoneRef = useRef(false);
  const prevScrollHeightRef = useRef(0);
  const prevScrollTopRef = useRef(0);
  const isLoadingMoreRef = useRef(false);

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
        params: {
          limit,
          skip: 0,
        },
      });

      console.log(chat);

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text, createdAt } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
          createdAt,
        };
      });
      setMessages(chatMessages);
      setError("");
      setIsInitialLoading(false);
      if (typeof chat?.data?.hasMore === "boolean") {
        setHasMore(chat.data.hasMore);
      } else if (typeof chat?.data?.totalMessages === "number") {
        setHasMore(chat.data.totalMessages > chatMessages.length);
      }
    } catch (err) {
      console.error("Failed to fetch chat", err);
      setIsInitialLoading(false);
      if (axios.isAxiosError(err) && err.response?.status === 403) {
        setError("You can only chat with your connections.");
      } else {
        setError("Failed to load chat. Please try again later.");
      }
      setMessages([]);
      setHasMore(false);
    }
  };

  const loadMoreMessages = async () => {
    if (!hasMore || loadingMore) return;

    try {
      isLoadingMoreRef.current = true;
      if (chatContainerRef.current) {
        prevScrollHeightRef.current = chatContainerRef.current.scrollHeight;
        prevScrollTopRef.current = chatContainerRef.current.scrollTop;
      }
      setLoadingMore(true);
      const currentSkip = messages.length;
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
        params: {
          limit,
          skip: currentSkip,
        },
      });

      const olderChatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text, createdAt } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
          createdAt,
        };
      });

      if (!olderChatMessages?.length) {
        setHasMore(false);
        return;
      }

      setMessages((prev) => [...olderChatMessages, ...prev]);
      if (typeof chat?.data?.hasMore === "boolean") {
        setHasMore(chat.data.hasMore);
      } else if (typeof chat?.data?.totalMessages === "number") {
        const totalMessages = chat.data.totalMessages;
        const loadedMessagesCount = currentSkip + olderChatMessages.length;
        setHasMore(loadedMessagesCount < totalMessages);
      }
    } catch (error) {
      console.error("Failed to load more messages", error);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setMessages([]);
    setHasMore(true);
    setLoadingMore(false);
    setIsInitialLoading(true);
    setNewMessage("");
    initialScrollDoneRef.current = false;
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!chatContainerRef.current) return;

    if (isLoadingMoreRef.current) {
      const newScrollHeight = chatContainerRef.current.scrollHeight;
      const diff = newScrollHeight - prevScrollHeightRef.current;
      chatContainerRef.current.scrollTop = prevScrollTopRef.current + diff;
      isLoadingMoreRef.current = false;
      return;
    }

    if (!initialScrollDoneRef.current && messages.length > 0) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
      initialScrollDoneRef.current = true;
    }
  }, [messages]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    if (error) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, createdAt }) => {
      console.log(firstName + " :  " + text);
      setMessages((messages) => [
        ...messages,
        {
          firstName,
          lastName,
          text,
          createdAt: createdAt || new Date().toISOString(),
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, error]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
 
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-100">
        <div className="alert alert-error w-full max-w-md shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-base-200 via-base-100 to-base-200 p-4">
      <div className="w-full max-w-2xl h-[85vh] flex flex-col bg-base-100 rounded-xl shadow-2xl overflow-hidden border border-base-300">
        
        
        <div className="bg-linear-to-r from-primary to-primary-focus text-primary-content px-6 py-4 shadow-lg shrink-0">
          <h1 className="text-2xl font-bold">Conversation</h1>
          <p className="text-xs opacity-85">Chat with your connections</p>
        </div>

       
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-base-100" ref={chatContainerRef}>
          
          {isInitialLoading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="text-sm opacity-60 mt-4">Loading messages...</p>
            </div>
          ) : (
            <>
              {hasMore && messages.length > 0 && (
                <div className="flex justify-center mb-4">
                  <button
                    onClick={loadMoreMessages}
                    disabled={loadingMore}
                    className="btn btn-outline btn-xs gap-2 text-xs"
                  >
                    {loadingMore ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Loading
                      </>
                    ) : (
                      "↑ Older messages"
                    )}
                  </button>
                </div>
              )}

              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-base-content opacity-40">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-base font-semibold">No messages yet</p>
                  <p className="text-xs">Start the conversation</p>
                </div>
              ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`chat ${user.firstName === msg.firstName ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-header font-semibold text-xs mb-0.5 opacity-70">
                  {msg.firstName}
                </div>
                <div className={`chat-bubble text-sm py-2 px-3 ${user.firstName === msg.firstName ? "bg-primary text-primary-content" : "bg-base-200 text-base-content"}`}>
                  {msg.text}
                </div>
                <div className="chat-footer text-xs opacity-40 mt-0.5">
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </div>
              </div>
            ))
              )}
            </>
          )}
        </div>

       
        <div className="bg-base-100 border-t border-base-300 px-6 py-3 shrink-0">
          <div className="flex items-end gap-2">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type message... (Enter to send)"
              className="textarea textarea-bordered textarea-sm w-full resize-none focus:textarea-primary py-2"
              rows="1"
            />
            <button 
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="btn btn-primary btn-sm gap-1 shrink-0 no-animation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.6563168,11.6889879 L4.13399899,2.89157339 C3.34915502,2.40026846 2.40734225,2.5573659 1.77946707,3.08259922 C0.994623095,3.60783254 0.837654301,4.69767441 1.15159189,5.48316127 L3.03521743,11.9241543 C3.03521743,12.0812516 3.19218622,12.2383491 3.50612381,12.2383491 L16.6915026,13.0238359 C16.6915026,13.0238359 17.1624089,13.0238359 17.1624089,12.4744748 C17.1624089,11.9241543 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
