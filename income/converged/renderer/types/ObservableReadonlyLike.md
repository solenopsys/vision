#### `ObservableReadonlyLike`

This type says that something hsa the same shape as a read-only observable, but it may not actually be an observable.

Interface:

```ts
type ObservableReadonlyLike<T> = {
  (): T
};
```

Usage:

```tsx
import type {ObservableReadonlyLike} from 'renderer';

const fn = ( value: ObservableReadonlyLike<boolean> ): void => {
  value (); // Getting
  value ( true ); // This is not supported!
};
```