import { Box, Button, FormControlLabel, Switch } from "@mui/material";

import { messageService } from "../../services/messageService";
import { Message } from "../../types";
import { containerSx, deleteBtnSx } from "./styles";

interface MessageViewerActionsProps {
  selectedMessage: Message;
}

const MessageViewerActions = ({
  selectedMessage,
}: MessageViewerActionsProps) => {
  const readValue = selectedMessage && selectedMessage.isRead;

  const handleSwitchRead = () => {
    if (selectedMessage) {
      messageService.toggleReadStatus(selectedMessage.id);
    }
  };

  const handleDelete = () => {
    if (selectedMessage) {
      messageService.deleteMessage(selectedMessage.id);
    }
  };

  return (
    <Box sx={containerSx}>
      <FormControlLabel
        checked={readValue}
        onChange={handleSwitchRead}
        control={<Switch />}
        label={`Mark as ${readValue ? "Unread" : "Read"}`}
      />
      <Button
        variant="outlined"
        color="error"
        onClick={handleDelete}
        sx={deleteBtnSx}
      >
        Delete
      </Button>
    </Box>
  );
};

export default MessageViewerActions;
