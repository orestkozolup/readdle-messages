import { messageService } from "../../services/messageService";
import { useObservable } from "../../hooks/useObservable";

const MessageViewer = () => {
  const selectedMessage = useObservable(messageService.selectedMessage$, null);

  return (
    <div>
      {selectedMessage ? (
        <>
          <h2>{selectedMessage.subject}</h2>
          <p>From: {selectedMessage.from}</p>
          <p>{selectedMessage.content}</p>
        </>
      ) : (
        <p>Select a message to view its details</p>
      )}
    </div>
  );
};

export default MessageViewer;
