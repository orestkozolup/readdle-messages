import {
  allMessages$,
  currentCategoryName$,
  selectedMessageId$,
	observables
} from "./state";

export const selectMessage = (id: string) => {
  selectedMessageId$.next(id);
};

export const toggleReadStatus = (messageId: string) => {
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

export const deleteMessage = (messageId: string) => {
  allMessages$.next(
    allMessages$
      .getValue()
      .map((message) =>
        message.id === messageId ? { ...message, isDeleted: true } : message
      )
  );

  selectedMessageId$.next(null);
};

export const changeMessageCategory = (newCategory: string) => {
  const previousCategory = currentCategoryName$.getValue();
  observables[previousCategory].next(allMessages$.getValue());
  allMessages$.next(observables[newCategory].getValue());
  currentCategoryName$.next(newCategory);
  selectedMessageId$.next(null);
};
