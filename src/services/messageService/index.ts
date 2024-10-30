import { BehaviorSubject } from "rxjs";

import { httpService } from "../httpService";
import { Message, isMessagesPayload } from "../../types";

import {
  allMessages$,
  visibleMessages$,
  messageCategories$,
  currentCategoryName$,
  selectedMessage$,
  loading$,
  error$,
  observables,
} from "./state";

import {
  selectMessage,
  toggleReadStatus,
  deleteMessage,
  changeMessageCategory,
} from "./actions";

import { sortMessages } from "./utils";

const initializeMessages = async () => {
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
