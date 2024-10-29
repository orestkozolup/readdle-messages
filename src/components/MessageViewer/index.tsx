import { useEffect, useState } from "react";

import { messageService, Message } from "../../services/messageService";

const MessageViewer = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    const subscription =
      messageService.selectedMessage$.subscribe(setSelectedMessage);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
