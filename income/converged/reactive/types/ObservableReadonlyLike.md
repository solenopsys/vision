#### `ObservableReadonlyLike`

This type describes an object with the same interface as a read-only Observable, but which may not actually be an Observable.

Interface:

```ts
type ObservableReadonlyLike<T> = {
  (): T;
};
```
