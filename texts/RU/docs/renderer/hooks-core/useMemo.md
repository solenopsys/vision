#### `useMemo`

This hook is the crucial other ingredient that we need, other than observables themselves, to have a powerful reactive system that can track dependencies and re-execute computations when needed.

This hook registers a function to be called when any of its dependencies change, and the return of that function is wrapped in a read-only observable and returned.

[Read upstream documentation](https://github.com/solenopsys/converged-reactive#memo).

Interface:

```ts
function useMemo <T> ( fn: () => T, options?: MemoOptions<T | undefined> ): ObservableReadonly<T>;
```

Usage:

```tsx
import {useMemo} from 'renderer';

useMemo // => Same as require ( 'reactive' ).memo
```
