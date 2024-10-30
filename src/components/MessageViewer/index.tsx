import { Box, Skeleton } from "@mui/material";

import MessageViewerActions from "../MessageViewerActions";
import { messageService } from "../../services/messageService";
import { useObservable } from "../../hooks/useObservable";
import { containerSx, messageContainerSx } from "./styles";
import { getHumanReadableDate } from "../../utils/date";

const MessageViewer = () => {
  const selectedMessage = useObservable(messageService.selectedMessage$, null);
  const isLoading = useObservable(messageService.loading$, true);

  if (isLoading) {
    return <Skeleton height="15rem" />;
  }

  return (
    <Box sx={containerSx}>
      {selectedMessage ? (
        <>
          <MessageViewerActions selectedMessage={selectedMessage} />
          <Box sx={messageContainerSx}>
            <h2>{selectedMessage.subject}</h2>
            <p>
              From: <strong>{selectedMessage.from}</strong>
            </p>
            <i>{getHumanReadableDate(selectedMessage.date)}</i>
            <p>{selectedMessage.content}</p>
          </Box>
        </>
      ) : (
        <p>Select a message to view its details</p>
      )}
    </Box>
  );
};

export default MessageViewer;
