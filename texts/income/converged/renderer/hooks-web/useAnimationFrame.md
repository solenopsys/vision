#### `useAnimationFrame`

This hook is just an alternative to `requestAnimationFrame` that automatically clears itself when the parent computation is disposed.

Interface:

```ts
function useAnimationFrame ( callback: ObservableMaybe<FrameRequestCallback> ): Disposer;
```

Usage:

```tsx
import {useAnimationFrame} from 'renderer';

useAnimationFrame ( () => console.log ( 'called' ) );
```

