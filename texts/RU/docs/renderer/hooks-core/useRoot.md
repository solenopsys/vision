
#### `useRoot`

This hook creates a new computation root, detached from any parent computation.

[Read upstream documentation](https://github.com/solenopsys/converged-reactive#root).

Interface:

```ts
function useRoot <T> ( fn: ( dispose: () => void ) => T ): T;
```

Usage:

```tsx
import {useRoot} from 'renderer';

useRoot // => Same as require ( 'reactive' ).root
```

