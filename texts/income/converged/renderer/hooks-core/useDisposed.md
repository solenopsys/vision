#### `useDisposed`

This hook returns a boolean read-only observable that is set to `true` when the parent computation gets disposed of.

[Read upstream documentation](https://github.com/solenopsys/converged-reactive#disposed).

Interface:

```ts
function useDisposed (): ObservableReadonly<boolean>;
```

Usage:

```tsx
import {useDisposed} from 'renderer';

useDisposed // => Same as require ( 'reactive' ).disposed
```



