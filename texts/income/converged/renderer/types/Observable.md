#### `Observable`

This type says that something is a regular observable, which can be updated via its setter.

Interface:

```ts
type Observable<T> = {
  (): T,
  ( value: T ): T,
  ( fn: ( value: T ) => T ): T,
  readonly [ObservableSymbol]: true
};
```

Usage:

```tsx
import type {Observable} from 'renderer';

const fn = ( value: Observable<boolean> ): void => {
  value (); // Getting
  value ( true ); // Setting
};
```

