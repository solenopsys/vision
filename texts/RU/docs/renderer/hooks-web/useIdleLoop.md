#### `useIdleLoop`

This hook is just a version of `useIdleCallback` that loops until the parent computation is disposed.

Interface:

```ts
function useIdleLoop ( callback: ObservableMaybe<IdleRequestCallback>, options?: FunctionMaybe<IdleRequestOptions> ): Disposer;
```

Usage:

```tsx
import {useIdleLoop} from 'renderer';

useIdleLoop ( () => console.log ( 'called' ) );
```
