#### `EffectOptions`

This type describes the options object that the `useEffect` hook accepts.

Interface:

```ts
type EffectOptions = {
  suspense?: boolean,
  sync?: boolean | 'init'
};
```

Usage:

```tsx
import {useEffect} from 'renderer';

// Make a regular asynchronous effect

useEffect ( () => {
  // Do something...
});

// Make a synchronous effect, which is strongly discouraged

useEffect ( () => {
  // Do something...
}, { sync: true } );

// Make an asynchronous effect that's executed immediately on creation, which is useful in edge cases

useEffect ( () => {
  // Do something...
}, { sync: 'init' } );

// Make an effect that won't be paused by `Suspense`, which is useful in edge cases

useEffect ( () => {
  // Do something...
}, { suspense: false } );
```