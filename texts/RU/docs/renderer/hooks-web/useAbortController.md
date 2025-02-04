#### `useAbortController`

This hook is just an alternative to `new AbortController ()` that automatically aborts itself when the parent computation is disposed.

Interface:

```ts
function useAbortController ( signals?: ArrayMaybe<AbortSignal> ): AbortController;
```

Usage:

```tsx
import {useAbortController} from 'renderer';

const controller = useAbortController ();
```
