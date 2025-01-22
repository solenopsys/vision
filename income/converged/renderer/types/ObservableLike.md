
#### `ObservableLike`

This type says that something has the same shape as a regular observable, but it may not actually be an observable.

Interface:

```ts
type ObservableLike<T> = {
  (): T,
  ( value: T ): T,
  ( fn: ( value: T ) => T ): T
};
```

Usage:

```tsx
import type {ObservableLike} from 'renderer';

const fn = ( value: ObservableLike<boolean> ): void => {
  value (); // Getting
  value ( true ); // Setting
};
```