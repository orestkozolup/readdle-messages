import Box from "@mui/material/Box";

import MessageViewerActions from "../MessageViewerActions";
import { messageService } from "../../services/messageService";
import { useObservable } from "../../hooks/useObservable";
import { containerSx } from "./styles";
import { getHumanReadableDate } from "../../utils/date";

const MessageViewer = () => {
  const selectedMessage = useObservable(messageService.selectedMessage$, null);

  return (
    <Box sx={containerSx}>
      {selectedMessage ? (
        <>
          <MessageViewerActions selectedMessage={selectedMessage} />
          <h2>{selectedMessage.subject}</h2>
          <p>From: {selectedMessage.from}</p>
          <p>{selectedMessage.content}</p>
          <p>Received: {getHumanReadableDate(selectedMessage.date)}</p>
        </>
      ) : (
        <p>Select a message to view its details</p>
      )}
    </Box>
  );
};

export default MessageViewer;
