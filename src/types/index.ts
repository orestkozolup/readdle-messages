export interface Message {
  id: string;
  date: string;
  from: string;
  subject: string;
  isRead: boolean;
  isDeleted: boolean;
  content: string;
}

export const isMessage = (obj: unknown): obj is Message => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof (obj as Message).id === "string" &&
    typeof (obj as Message).date === "string" &&
    typeof (obj as Message).from === "string" &&
    typeof (obj as Message).subject === "string" &&
    typeof (obj as Message).isRead === "boolean" &&
    typeof (obj as Message).isDeleted === "boolean" &&
    typeof (obj as Message).content === "string"
  );
};

export const isMessagesPayload = (
  obj: unknown
): obj is Record<string, Message[]> => {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const messages = (obj as Record<string, Message[]>)[key];
      if (!Array.isArray(messages) || !messages.every(isMessage)) {
        return false;
      }
    }
  }
  return true;
};
