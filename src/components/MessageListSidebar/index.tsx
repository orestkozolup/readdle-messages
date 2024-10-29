import { messageService, Message } from "../../services/messageService";
import { useObservable } from "../../hooks/useObservable";

const MessageListSidebar = () => {
  const messages = useObservable(messageService.messages$, []);

  return (
    <>
      {messages.map((message: Message) => (
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
