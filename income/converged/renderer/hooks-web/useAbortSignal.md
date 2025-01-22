#### `useAbortSignal`

This hook is just a convenient alternative to `useAbortController`, if you are only interested in its signal, which is automatically aborted when the parent computation is disposed.

Interface:

```ts
function useAbortSignal ( signals?: ArrayMaybe<AbortSignal> ): AbortSignal;
```

Usage:

```tsx
import {useAbortSignal} from 'renderer';

const signal = useAbortSignal ();
```