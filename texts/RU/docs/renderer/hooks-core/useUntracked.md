#### `useUntracked`

This hook returns an untracked version of a value.

[Read upstream documentation](https://github.com/solenopsys/converged-reactive#untracked).

Interface:

```ts
function useUntracked <T> ( fn: () => T ): () => T;
function useUntracked <T> ( value: T ): () => T;
```

Usage:

```tsx
import {useUntracked} from 'renderer';

useUntracked // => Same as require ( 'reactive' ).untracked
```
