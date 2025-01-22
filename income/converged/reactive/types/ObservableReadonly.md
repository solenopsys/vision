#### `ObservableReadonly`

This type describes a read-only Observable, like what you'd get from `$.memo` or `$.readonly`.

Interface:

```ts
type ObservableReadonly<T> = {
  (): T;
  readonly [ObservableSymbol]: true;
};
```
