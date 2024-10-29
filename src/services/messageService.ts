import { BehaviorSubject, combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { httpService } from "./httpService";

export interface Message {
  id: string;
  date: string;
  from: string;
  subject: string;
  isRead: boolean;
  isDeleted: boolean;
  content: string;
}

export interface MockMessages {
  [key: string]: Message[];
}

// validation functions
function isMessage(obj: any): obj is Message {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "string" &&
    typeof obj.date === "string" &&
    typeof obj.from === "string" &&
    typeof obj.subject === "string" &&
    typeof obj.isRead === "boolean" &&
    typeof obj.isDeleted === "boolean" &&
    typeof obj.content === "string"
  );
}

function isMockMessages(obj: any): obj is Record<string, Message[]> {
  if (typeof obj !== "object" || obj === null) return false;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const messages = obj[key];
      if (!Array.isArray(messages) || !messages.every(isMessage)) {
        return false;
      }
    }
  }
  return true;
}

// State observables
const allMessages$ = new BehaviorSubject<Message[]>([]);
const visibleMessages$ = allMessages$.pipe(
  map((messages) => messages.filter((message) => !message.isDeleted))
);
const messageCategories$ = new BehaviorSubject<string[]>([]);
const currentCategoryName$ = new BehaviorSubject<string>('');
const selectedMessageId$ = new BehaviorSubject<string | null>(null);
const selectedMessage$ = combineLatest([allMessages$, selectedMessageId$]).pipe(
  map(
    ([messages, selectedMessageId]) =>
      messages.find((message: Message) => message.id === selectedMessageId) ||
      null
  )
);

export const initializeMessages = async () => {
  const data = await httpService.getMessages();

  if (!isMockMessages(data)) {
    throw new Error("Invalid message structure");
  }

  const mockMessages: Record<string, Message[]> = data;

  const sortedMessages = mockMessages.inbox.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  Object.keys(mockMessages).forEach((key) => {
    observables[key] = new BehaviorSubject(mockMessages[key]);
  });

  allMessages$.next(sortedMessages);
  const categoryNames = Object.keys(mockMessages);
  messageCategories$.next(categoryNames);
  currentCategoryName$.next(categoryNames[0]);
};

initializeMessages();

const selectMessage = (id: string) => {
  selectedMessageId$.next(id);
};

const toggleReadStatus = (messageId: string) => {
  allMessages$.next(
    allMessages$
      .getValue()
      .map((message) =>
        message.id === messageId
          ? { ...message, isRead: !message.isRead }
          : message
      )
  );
};

const deleteMessage = (messageId: string) => {
  allMessages$.next(
    allMessages$
      .getValue()
      .map((message) =>
        message.id === messageId ? { ...message, isDeleted: true } : message
      )
  );

  selectedMessageId$.next(null);
};

const observables: { [key: string]: BehaviorSubject<Message[]> } = {};

const changeMessageCategory = (newCategory: string) => {
  const previousCategory = currentCategoryName$.getValue();
  observables[previousCategory].next(allMessages$.getValue());
  allMessages$.next(observables[newCategory].getValue());
  currentCategoryName$.next(newCategory);
  selectedMessageId$.next(null);
};

export const messageService = {
  messages$: visibleMessages$,
  selectedMessage$,
  messageCategories$,
  selectMessage,
  toggleReadStatus,
  deleteMessage,
  changeMessageCategory,
};
