#### `useIdleCallback`

This hook is just an alternative to `requestIdleCallback` that automatically clears itself when the parent computation is disposed.

Interface:

```ts
function useIdleCallback ( callback: ObservableMaybe<IdleRequestCallback>, options?: FunctionMaybe<IdleRequestOptions> ): Disposer;
```

Usage:

```tsx
import {useIdleCallback} from 'renderer';

useIdleCallback ( () => console.log ( 'called' ) );
```

