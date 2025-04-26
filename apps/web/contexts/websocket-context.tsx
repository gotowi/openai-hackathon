"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import { useWebSocket } from "partysocket/react";

// Define the shape of our context
interface WebSocketContextType {
  sendMessage: (message: string) => void;
  isConnected: boolean;
  subscribe: (callback: Function) => string;
  unsubscribe: (id: string) => void;
}

// Create the context with a default value
const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

// Props for our provider component
interface WebSocketProviderProps {
  children: ReactNode;
  startClosed?: boolean;
}

export function WebSocketProvider({
  children,
  startClosed = false,
}: WebSocketProviderProps) {
  const subscribers = useRef<Map<string, Function>>(new Map());

  const ws = useWebSocket(
    process.env.NEXT_PUBLIC_WSS_URL as string,
    undefined,
    {
      startClosed,
      onMessage(event) {
        const data = JSON.parse(event.data);
        subscribers.current.forEach((callback) => {
          callback(data);
        });
        // // toast.info(event.data);
        // const data = JSON.parse(event.data);
        // if (data.status === "done") {
        //   queryClient.invalidateQueries({ queryKey: ["tasks"] });
        //   toast.dismiss(data.id);
        // }
      },
    }
  );

  useEffect(() => {
    if (startClosed) {
      ws.reconnect();
    }
  }, []);

  function subscribe(callback: Function) {
    const id = Math.random().toString(36).substring(2, 15);
    subscribers.current.set(id, callback);
    return id;
  }

  function unsubscribe(id: string) {
    subscribers.current.delete(id);
  }

  function sendMessage(message: string) {
    ws.send(message);
  }

  // The value that will be provided to consumers of this context
  const value: WebSocketContextType = {
    sendMessage,
    isConnected: ws.readyState === WebSocket.OPEN,
    subscribe,
    unsubscribe,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
}

// Custom hook to use the WebSocket context
export function useWebSocketContext() {
  const context = useContext(WebSocketContext);

  if (context === undefined) {
    throw new Error(
      "useWebSocketContext must be used within a WebSocketProvider"
    );
  }

  return context;
}
