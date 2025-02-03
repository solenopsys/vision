#### `MemoOptions`

This type describes the options object that the `useMemo` hook accepts.

Interface:

```ts
type MemoOptions<T> = {
  equals?: (( value: T, valuePrev: T ) => boolean) | false,
  sync?: boolean
};
```

Usage:

```tsx
import {useMemo} from 'renderer';

// Make a regular asynchronous memo

useMemo ( () => {
  // Do something...
});

// Make a synchronous memo, which is strongly discouraged

useMemo ( () => {
  // Do something...
}, { sync: true } );
```
