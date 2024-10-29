import { useEffect, useState } from "react";
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
        <div
          key={message.id}
          style={{ border: "1px solid black", cursor: "pointer" }}
          onClick={() => messageService.selectMessage(message.id)}
        >
          <h4>{message.subject}</h4>
          <p>{message.from}</p>
        </div>
      ))}
    </>
  );
};

export default MessageListSidebar;
