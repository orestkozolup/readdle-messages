import { Box, Skeleton } from "@mui/material";

import NavBar from "../NavBar";
import MessageListItem from "../MessageListItem";
import { messageService } from "../../services/messageService";
import { useObservable } from "../../hooks/useObservable";
import { Message } from "../../types";
import { containerSx, messageListSx, skeletonSx } from "./styles";

const MessageListSidebar = () => {
  const messages = useObservable(messageService.messages$, []);
  const isLoading = useObservable(messageService.loading$, true);

  return (
    <Box sx={containerSx}>
      <NavBar />
      <Box sx={messageListSx}>
        {isLoading
          ? [...Array(5)].map((_, idx) => (
              <Skeleton
                key={idx}
                sx={skeletonSx}
                variant="rounded"
                width="100%"
                height="6.5rem"
              />
            ))
          : messages.map((message: Message) => (
              <MessageListItem message={message} key={message.id} />
            ))}
      </Box>
    </Box>
  );
};

export default MessageListSidebar;
