import { mockMessages } from "../../services/messageService";

const MessageViewer = () => {
  const selectedMessage = mockMessages[0];

  if (!selectedMessage) {
    return <div>Select a message to view its details</div>;
  }

  return (
    <>
      <h2>{selectedMessage.subject}</h2>
      <p>From: {selectedMessage.from}</p>
      <p>{selectedMessage.content}</p>
    </>
  );
};

export default MessageViewer;
