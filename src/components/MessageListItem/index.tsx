import { useMemo } from "react";
import { Box, Typography } from "@mui/material";

import { useObservable } from "../../hooks/useObservable";
import { Message } from "../../types";
import { messageService } from "../../services/messageService";
import { containerSx, activeItemSx, readItemSx } from "./styles";
import { combineStyles } from "../../utils/styles";

interface MessageListItemProps {
  message: Message;
}

const MessageListItem = ({ message }: MessageListItemProps) => {
  const selectedMessage = useObservable(messageService.selectedMessage$, null);
  const isMessageActive = selectedMessage && selectedMessage.id === message.id;

  const handleMessageClick = () => {
    messageService.selectMessage(message.id);
  };

  const itemStyle = useMemo(() => {
    const readStyle = combineStyles(message.isRead, containerSx, readItemSx);

    return combineStyles(isMessageActive, readStyle, activeItemSx);
  }, [message.isRead, isMessageActive]);

  return (
    <Box sx={itemStyle} onClick={handleMessageClick}>
      <Typography variant="subtitle1" component="h4" noWrap>
        {message.subject}
      </Typography>
      <Typography variant="body2" color="text.secondary" noWrap>
        {message.from} — {message.date}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {message.content}
      </Typography>
    </Box>
  );
};

export default MessageListItem;
