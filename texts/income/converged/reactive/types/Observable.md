#### `Observable`

This type describes a regular writable Observable, like what you'd get from `$()`.

Interface:

```ts
type Observable<T> = {
  (): T;
  (value: T): T;
  (fn: (value: T) => T): T;
  readonly [ObservableSymbol]: true;
};
```