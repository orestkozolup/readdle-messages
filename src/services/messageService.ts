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
const messages$ = new BehaviorSubject<Message[]>(mockMessages);
const selectedMessageId$ = new BehaviorSubject<string | null>(null);
const selectedMessage$ = combineLatest([messages$, selectedMessageId$]).pipe(
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
  messages$.next(
    messages$
      .getValue()
      .map((message) =>
        message.id === messageId
          ? { ...message, isRead: !message.isRead }
          : message
      )
  );
};

export const messageService = {
  messages$,
  selectedMessage$,
  selectMessage,
  toggleReadStatus,
};
