#### `ObservableLike`

This type describes an object with the same interface as a regular writable Observable, but which may not actually be an Observable.

Interface:

```ts
type ObservableLike<T> = {
  (): T;
  (value: T): T;
  (fn: (value: T) => T): T;
};
```