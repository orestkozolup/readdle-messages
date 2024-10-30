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
  categoryObservables,
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
      throw new Error("Invalid messages structure received");
    }

    const messagesData: Record<string, Message[]> = data;

    const categoryNames = Object.keys(messagesData);
    messageCategories$.next(categoryNames);

    categoryNames.forEach((key) => {
      categoryObservables[key] = new BehaviorSubject(sortMessages(messagesData[key]));
    });

    const initialCategory = categoryNames[0];
    currentCategoryName$.next(initialCategory);
    const sortedMessages = sortMessages(messagesData[initialCategory]);
    allMessages$.next(sortedMessages);
    
    loading$.next(false);
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
