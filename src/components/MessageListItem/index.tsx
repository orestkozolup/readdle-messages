import { Box, Typography } from "@mui/material";

import { Message } from "../../types";
import { messageService } from "../../services/messageService";
import { containerSx } from "./styles";

interface MessageListItemProps {
  message: Message;
}

const MessageListItem = ({ message }: MessageListItemProps) => {
  const handleMessageClick = () => {
    messageService.selectMessage(message.id);
  };

  return (
    <Box sx={containerSx} onClick={handleMessageClick}>
      <Typography variant="subtitle1" component="h4" noWrap>
        {message.subject}
      </Typography>
      <Typography variant="body2" color="text.secondary" noWrap>
        {message.from} — {message.date}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
        {message.content}
      </Typography>
    </Box>
  );
};

export default MessageListItem;
