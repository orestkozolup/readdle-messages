import { messageService } from "../../services/messageService";
import { useObservable } from "../../hooks/useObservable";

const MessageViewer = () => {
  const selectedMessage = useObservable(messageService.selectedMessage$, null);

  const handleToggleRead = () => {
    messageService.toggleReadStatus(selectedMessage.id);
  };

  return (
    <div>
      {selectedMessage ? (
        <>
          <h2>{selectedMessage.subject}</h2>
          <p>From: {selectedMessage.from}</p>
          <p>{selectedMessage.content}</p>
          <button onClick={handleToggleRead}>
            Mark as {selectedMessage.isRead ? "Unread" : "Read"}
          </button>
        </>
      ) : (
        <p>Select a message to view its details</p>
      )}
    </div>
  );
};

export default MessageViewer;
