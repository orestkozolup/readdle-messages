import { BehaviorSubject, combineLatest } from "rxjs";
import { map } from "rxjs/operators";

export interface Message {
  id: string;
  date: string;
  from: string;
  subject: string;
  isRead: boolean;
  isDeleted: boolean;
  content: string;
}

export const mockMessages: Message[] = [
  {
    id: "1",
    date: "2024-10-11 12:03",
    isRead: false,
    isDeleted: false,
    subject: "Welcome!",
    content: "Welcome to messaging service.",
    from: "admin@messageapp.com",
  },
  {
    id: "2",
    date: "2024-10-11 12:04",
    subject: "GDPR",
    content: "Please review and acknowledge our GDPR policy.",
    from: "info@messageapp.com",
    isRead: false,
    isDeleted: false,
  },
  {
    id: "3",
    date: "2024-10-11 12:10",
    subject: "Invitation",
    content: "You are invited to join.",
    from: "melanie@oceanside.com",
    isRead: false,
    isDeleted: false,
  },
];

// State observables
const allMessages$ = new BehaviorSubject<Message[]>(mockMessages);
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
