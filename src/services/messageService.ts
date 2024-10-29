import { BehaviorSubject, combineLatest } from "rxjs";
import { map } from "rxjs/operators";

import mockMessages from "./data.json";

export interface Message {
  id: string;
  date: string;
  from: string;
  subject: string;
  isRead: boolean;
  isDeleted: boolean;
  content: string;
}

const sortedMessages = mockMessages.inbox.sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

// State observables
const allMessages$ = new BehaviorSubject<Message[]>(sortedMessages);
const visibleMessages$ = allMessages$.pipe(
  map((messages) => messages.filter((message) => !message.isDeleted))
);
const selectedMessageId$ = new BehaviorSubject<string | null>(null);
const selectedMessage$ = combineLatest([allMessages$, selectedMessageId$]).pipe(
  map(
    ([messages, selectedMessageId]) =>
      messages.find((message: Message) => message.id === selectedMessageId) ||
      null
  )
);

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

export const messageService = {
  messages$: visibleMessages$,
  selectedMessage$,
  selectMessage,
  toggleReadStatus,
  deleteMessage,
};
