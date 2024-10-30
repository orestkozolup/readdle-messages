import { useMemo } from "react";
import { Box, Typography } from "@mui/material";

import { useObservable } from "../../hooks/useObservable";
import { Message } from "../../types";
import { messageService } from "../../services/messageService";
import { containerSx, activeItemSx, readItemSx, contentSx } from "./styles";
import { combineStyles } from "../../utils/styles";
import { getHumanReadableDate } from "../../utils/date";

interface MessageListItemProps {
  message: Message;
}

const MessageListItem = ({ message }: MessageListItemProps) => {
  const selectedMessage = useObservable(messageService.selectedMessage$, null);
  const isMessageActive = !!(
    selectedMessage && selectedMessage.id === message.id
  );

  const handleMessageClick = () => {
    messageService.selectMessage(message.id);
  };

  const itemStyle = useMemo(() => {
    const readStyle = combineStyles(message.isRead, containerSx, readItemSx);

    return combineStyles(isMessageActive, readStyle, activeItemSx);
  }, [message.isRead, isMessageActive]);

  return (
    <Box sx={itemStyle} onClick={handleMessageClick}>
      <Typography variant="subtitle1" noWrap>
        {message.subject}
      </Typography>
      <Typography variant="body2" noWrap>
        From: {message.from}
      </Typography>
      <Typography variant="body2" component="i" noWrap>
        {getHumanReadableDate(message.date)}
      </Typography>
      <Typography variant="body2" noWrap sx={contentSx}>
        {message.content}
      </Typography>
    </Box>
  );
};

export default MessageListItem;
