import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import MessageListItem from "../MessageListItem";
import { messageService } from "../../services/messageService";
import { useObservable } from "../../hooks/useObservable";
import { Message } from "../../types";
import { containerSx, btnSectionSx, messageListSx } from "./styles";

const MessageListSidebar = () => {
  const messages = useObservable(messageService.messages$, []);
  const messageCategories = useObservable(
    messageService.messageCategories$,
    []
  );

  const handleCategoryClick = (category: string) => {
    messageService.changeMessageCategory(category);
  };

  return (
    <Box sx={containerSx}>
      <Box sx={btnSectionSx}>
        {messageCategories.map((category: string) => (
          <button key={category} onClick={() => handleCategoryClick(category)}>
            {category}
          </button>
        ))}
      </Box>
      <Stack spacing={1.5} sx={messageListSx}>
        {messages.map((message: Message) => (
          <MessageListItem message={message} key={message.id} />
        ))}
      </Stack>
    </Box>
  );
};

export default MessageListSidebar;
