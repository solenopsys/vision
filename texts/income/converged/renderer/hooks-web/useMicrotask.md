#### `useMicrotask`

This hook is just an alternative to `queueMicrotask` that automatically clears itself when the parent computation is disposed, and that ensures things like contexts, error boundaries etc. keep working inside the microtask.

Interface:

```ts
function useMicrotask ( fn: () => void ): void;
```

Usage:

```tsx
import {useMicrotask} from 'renderer';

useMicrotask ( () => console.log ( 'called' ) );
```

