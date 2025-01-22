#### `useAnimationLoop`

This hook is just a version of `useAnimationFrame` that loops until the parent computation is disposed.

Interface:

```ts
function useAnimationLoop ( callback: ObservableMaybe<FrameRequestCallback> ): Disposer;
```

Usage:

```tsx
import {useAnimationLoop} from 'renderer';

useAnimationLoop ( () => console.log ( 'called' ) );
```




