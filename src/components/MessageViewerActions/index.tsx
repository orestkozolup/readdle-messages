import { Box, FormControlLabel, Switch } from "@mui/material";

import ModalButton from "../ModalButton";
import { messageService } from "../../services/messageService";
import { Message } from "../../types";
import { containerSx, deleteBtnSx } from "./styles";

interface MessageViewerActionsProps {
  selectedMessage: Message;
}

const MessageViewerActions = ({
  selectedMessage,
}: MessageViewerActionsProps) => {
  const isMessageRead = selectedMessage && selectedMessage.isRead;

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
        checked={isMessageRead}
        onChange={handleSwitchRead}
        control={<Switch />}
        label={`Mark as ${isMessageRead ? "Unread" : "Read"}`}
      />
      <ModalButton
        buttonText="Delete"
        modalText={`Do you confirm you want to delete message "${selectedMessage.subject}"?`}
        onConfirm={handleDelete}
        buttonType="error"
        buttonSx={deleteBtnSx}
      />
    </Box>
  );
};

export default MessageViewerActions;
