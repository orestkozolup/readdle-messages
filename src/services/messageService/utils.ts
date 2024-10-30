import { Message } from "../../types";

export const sortMessages = (messageList: Message[]) =>
  messageList.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
