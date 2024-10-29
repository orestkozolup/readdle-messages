import { messageService } from "../../services/messageService";
import { useObservable } from "../../hooks/useObservable";

const MessageViewer = () => {
  const selectedMessage = useObservable(messageService.selectedMessage$, null);

  const handleToggleRead = () => {
    if (selectedMessage) {
      messageService.toggleReadStatus(selectedMessage.id);
    }
  };

  const handleDelete = () => {
    if (selectedMessage) {
      messageService.deleteMessage(selectedMessage.id);
    }
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
          <button onClick={handleDelete} style={{ marginLeft: "10px" }}>
            Delete
          </button>
        </>
      ) : (
        <p>Select a message to view its details</p>
      )}
    </div>
  );
};

export default MessageViewer;
