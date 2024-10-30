import { useEffect, useState } from "react";
import { Observable } from "rxjs";

export const useObservable = <T>(
  observable: Observable<T>,
  initialValue: T
): T => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const subscription = observable.subscribe(setValue);
    return () => subscription.unsubscribe();
  }, [observable]);

  return value;
};
