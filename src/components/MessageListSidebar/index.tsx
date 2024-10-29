import { messageService, Message } from "../../services/messageService";
import { useObservable } from "../../hooks/useObservable";

const MessageListSidebar = () => {
  const messages = useObservable(messageService.messages$, []);
  const messageCategories = useObservable(
    messageService.messageCategories$,
    []
  );

  const handleCategoryClick = (category: string) => {
    messageService.changeMessageCategory(category);
  };

  return (
    <>
      <div>
        {messageCategories.map((category: string) => (
          <button key={category} onClick={() => handleCategoryClick(category)}>
            {category}
          </button>
        ))}
      </div>
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
