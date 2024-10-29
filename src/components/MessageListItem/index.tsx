import Box from "@mui/material/Box";

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
      <h4>{message.subject}</h4>
      <p>{message.from}</p>
      <p>{message.date}</p>
    </Box>
  );
};

export default MessageListItem;
