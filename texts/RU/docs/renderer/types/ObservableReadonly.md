#### `ObservableReadonly`

This type says that something is a read-only observable, which can only be read but not updated.

Interface:

```ts
type ObservableReadonly<T> = {
  (): T,
  readonly [ObservableSymbol]: true
};
```

Usage:

```tsx
import type {ObservableReadonly} from 'renderer';

const fn = ( value: ObservableReadonly<boolean> ): void => {
  value (); // Getting
  value ( true ); // This will throw!
};
```