export interface Message {
  id: string;
  date: string;
  from: string;
  subject: string;
  isRead: boolean;
  isDeleted: boolean;
  content: string;
}

export const isMessage = (obj: any): obj is Message =>
  typeof obj === "object" &&
  obj !== null &&
  typeof obj.id === "string" &&
  typeof obj.date === "string" &&
  typeof obj.from === "string" &&
  typeof obj.subject === "string" &&
  typeof obj.isRead === "boolean" &&
  typeof obj.isDeleted === "boolean" &&
  typeof obj.content === "string";

export const isMessagesPayload = (
  obj: any
): obj is Record<string, Message[]> => {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const messages = obj[key];
      if (!Array.isArray(messages) || !messages.every(isMessage)) {
        return false;
      }
    }
  }
  return true;
};
