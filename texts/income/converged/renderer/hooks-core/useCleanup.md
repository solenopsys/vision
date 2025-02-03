#### `useCleanup`

This hook registers a function to be called when the parent computation is disposed.

[Read upstream documentation](https://github.com/solenopsys/converged-reactive#cleanup).

Interface:

```ts
function useCleanup ( fn: () => void ): void;
```

Usage:

```tsx
import {useCleanup} from 'renderer';

useCleanup // => Same as require ( 'reactive' ).cleanup
```

