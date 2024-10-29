import { Stack, Box } from "@mui/material";

import NavBar from "../NavBar";
import MessageListItem from "../MessageListItem";
import { messageService } from "../../services/messageService";
import { useObservable } from "../../hooks/useObservable";
import { Message } from "../../types";
import { containerSx, messageListSx } from "./styles";

const MessageListSidebar = () => {
  const messages = useObservable(messageService.messages$, []);

  return (
    <Box sx={containerSx}>
      <NavBar />
      <Stack spacing={1.5} sx={messageListSx}>
        {messages.map((message: Message) => (
          <MessageListItem message={message} key={message.id} />
        ))}
      </Stack>
    </Box>
  );
};

export default MessageListSidebar;
