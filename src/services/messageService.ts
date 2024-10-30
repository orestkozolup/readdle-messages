import { BehaviorSubject, combineLatest } from "rxjs";
import { map } from "rxjs/operators";

import { httpService } from "./httpService";
import { Message, isMessagesPayload } from "../types";

// State observables
const allMessages$ = new BehaviorSubject<Message[]>([]);
const visibleMessages$ = allMessages$.pipe(
  map((messages) => messages.filter((message) => !message.isDeleted))
);
const messageCategories$ = new BehaviorSubject<string[]>([]);
const currentCategoryName$ = new BehaviorSubject<string>("");
const selectedMessageId$ = new BehaviorSubject<string | null>(null);
const selectedMessage$ = combineLatest([allMessages$, selectedMessageId$]).pipe(
  map(
    ([messages, selectedMessageId]) =>
      messages.find((message: Message) => message.id === selectedMessageId) ||
      null
  )
);
const loading$ = new BehaviorSubject<boolean>(true);
const error$ = new BehaviorSubject<string>("");

const sortMessages = (messageList: Message[]) =>
  messageList.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

export const initializeMessages = async () => {
  try {
    const data = await httpService.getMessages();

    if (!isMessagesPayload(data)) {
      throw new Error("Invalid message structure");
    }

    const messagesData: Record<string, Message[]> = data;

    const categoryNames = Object.keys(messagesData);

    const sortedMessages = sortMessages(messagesData[categoryNames[0]]);

    Object.keys(messagesData).forEach((key) => {
      observables[key] = new BehaviorSubject(sortMessages(messagesData[key]));
    });

    loading$.next(false);
    allMessages$.next(sortedMessages);
    messageCategories$.next(categoryNames);
    currentCategoryName$.next(categoryNames[0]);
  } catch (error) {
    error$.next(
      error instanceof Error ? error.message : "Something went wrong"
    );
    loading$.next(false);
  }
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
  currentCategoryName$,
  loading$,
  error$,
  selectMessage,
  toggleReadStatus,
  deleteMessage,
  changeMessageCategory,
};
