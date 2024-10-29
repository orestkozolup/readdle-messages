import { useEffect, useState } from "react";
import { Observable } from "rxjs";

export const useObservable = (
  observable: Observable<any>,
  initialValue: any
) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const subscription = observable.subscribe(setValue);
    return () => subscription.unsubscribe();
  }, [observable]);

  return value;
};
