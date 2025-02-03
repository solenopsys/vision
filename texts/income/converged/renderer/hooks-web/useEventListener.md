
#### `useEventListener`

This hook is just an alternative to `addEventListener` that automatically clears itself when the parent computation is disposed.

Interface:

```ts
function useEventListener ( target: FunctionMaybe<EventTarget>, event: FunctionMaybe<string>, handler: ObservableMaybe<( event: Event ) => void>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
```

Usage:

```tsx
import {useEventListener} from 'renderer';

useEventListener ( document, 'click', console.log );
```