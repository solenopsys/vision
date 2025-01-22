#### `useTimeout`

This hook is just an alternative to `setTimeout` that automatically clears itself when the parent computation is disposed.

Interface:

```ts
function useTimeout ( callback: ObservableMaybe<Callback>, ms?: FunctionMaybe<number> ): Disposer;
```

Usage:

```tsx
import {useTimeout} from 'renderer';

useTimeout ( () => console.log ( 'called' ), 1000 );
```

