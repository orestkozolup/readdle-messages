import { BehaviorSubject, combineLatest } from "rxjs";
import { map } from "rxjs/operators";

import { Message } from "../../types";

export const allMessages$ = new BehaviorSubject<Message[]>([]);
export const visibleMessages$ = allMessages$.pipe(
  map((messages) => messages.filter((message) => !message.isDeleted))
);
export const messageCategories$ = new BehaviorSubject<string[]>([]);
export const currentCategoryName$ = new BehaviorSubject<string>("");
export const selectedMessageId$ = new BehaviorSubject<string | null>(null);
export const selectedMessage$ = combineLatest([
  allMessages$,
  selectedMessageId$,
]).pipe(
  map(
    ([messages, selectedMessageId]) =>
      messages.find((message: Message) => message.id === selectedMessageId) ||
      null
  )
);
export const loading$ = new BehaviorSubject<boolean>(true);
export const error$ = new BehaviorSubject<string>("");

export const observables: { [key: string]: BehaviorSubject<Message[]> } = {};
