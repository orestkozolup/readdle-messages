import { useMemo } from "react";
import { Box, Typography, Menu, MenuItem } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useObservable } from "../../hooks/useObservable";
import { Message } from "../../types";
import { messageService } from "../../services/messageService";
import {
  containerSx,
  activeItemSx,
  readItemSx,
  contentSx,
  errorSx,
  firstLineSx,
} from "./styles";
import { combineStyles } from "../../utils/styles";
import { getHumanReadableDate } from "../../utils/date";
import { useContextMenu } from "./useContextMenu";

interface MessageListItemProps {
  message: Message;
}

const MessageListItem = ({ message }: MessageListItemProps) => {
  const selectedMessage = useObservable(messageService.selectedMessage$, null);
  const isMessageActive = selectedMessage?.id === message.id;

  const { anchorEl, isMenuOpen, openMenu, closeMenu, handleCloseEvent } =
    useContextMenu();

  const itemStyle = useMemo(() => {
    const readStyle = combineStyles(message.isRead, containerSx, readItemSx);
    return combineStyles(isMessageActive, readStyle, activeItemSx);
  }, [message.isRead, isMessageActive]);

  const viewMessage = () => {
    messageService.selectMessage(message.id);
    closeMenu();
  };
  const toggleReadStatus = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    messageService.toggleReadStatus(message.id);
    closeMenu();
  };
  const deleteMessage = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    messageService.deleteMessage(message.id);
    closeMenu();
  };

  return (
    <Box sx={itemStyle} onClick={viewMessage} onContextMenu={openMenu}>
      <Box sx={firstLineSx}>
        <Typography variant="subtitle1" noWrap>
          {message.subject}
        </Typography>
        {message.isRead && <VisibilityIcon color="success" />}
      </Box>
      <Typography variant="body2" noWrap>
        From: {message.from}
      </Typography>
      <Typography variant="body2" component="i" noWrap>
        {getHumanReadableDate(message.date)}
      </Typography>
      <Typography variant="body2" noWrap sx={contentSx}>
        {message.content}
      </Typography>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleCloseEvent}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MenuItem onClick={viewMessage}>View</MenuItem>
        <MenuItem onClick={toggleReadStatus}>
          Mark as {message.isRead ? "Unread" : "Read"}
        </MenuItem>
        <MenuItem onClick={deleteMessage} sx={errorSx}>
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MessageListItem;
