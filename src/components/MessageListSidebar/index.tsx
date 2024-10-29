import React, { useEffect, useState } from "react";
import { messageService, Message } from "../../services/messageService";

const MessageListSidebar = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const subscription = messageService.messages$.subscribe(setMessages);
    
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          <div>
            <h4>{message.subject}</h4>
            <p>{message.from}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default MessageListSidebar;
