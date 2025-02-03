#### `useInterval`

This hook is just an alternative to `setInterval` that automatically clears itself when the parent computation is disposed.

Interface:

```ts
function useInterval ( callback: ObservableMaybe<Callback>, ms?: FunctionMaybe<number> ): Disposer;
```

Usage:

```tsx
import {useInterval} from 'renderer';

useInterval ( () => console.log ( 'called' ), 1000 );
```

